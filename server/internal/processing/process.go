package processing

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"strings"
	"time"

	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/consts"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"gorm.io/gorm"
)

// struct for counting contacts
type contactCounter struct {
	sent, received int
}

// authenticate and connect to gmail
func authenticate(email string, db *gorm.DB) (*gmail.Service, error) {
	// get token from database
	var tokendb model.Token
	err := db.Where("id = ?", email).First(&tokendb).Error
	// error handling
	if err != nil {
		return nil, err
	}

	// reconstruct token
	tok := &oauth2.Token{}
	tok.AccessToken = tokendb.AccessToken
	tok.TokenType = tokendb.TokenType
	tok.RefreshToken = tokendb.RefreshToken
	tok.Expiry = tokendb.Expiry

	// connect to gmail and get service
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		return nil, err
	}
	config, err := google.ConfigFromJSON(b, gmail.GmailReadonlyScope)
	if err != nil {
		return nil, err
	}
	client := config.Client(context.Background(), tok)
	srv, err := gmail.New(client)
	if err != nil {
		return nil, err
	}

	// return the service to be used
	return srv, nil
}

// processDataArray takes in array of gmail.Messages and a partially complete model.Day
func processDataArray(template model.Day, dataArray []*gmail.Message, db *gorm.DB) {
	// setup saved variables
	receivedEmails := 0
	sentEmails := 0
	wordMap := make(map[string]int)
	contactMap := make(map[string]*contactCounter)
	hourCounts := make([]int, 24)

	// interate through all mails in array
	for _, mail := range dataArray {
		// set up variables to save metadata
		to, from, subject := "", "", ""
		// loop through all objects in Headers
		for _, obj := range mail.Payload.Headers {
			// switch case depending on Name of header
			switch obj.Name {
			case "Subject":
				subject = obj.Value
			case "To":
				to = obj.Value
			case "From":
				from = obj.Value
			// default means we got unknown/unwanted data(should not happen)
			default:
				log.Printf("Unknown data in Header: %v", obj)
				continue
			}
		}

		// examples of to/from(we want the top one)
		// - testinsightbox@gmail.com
		// - Test T<testinsightbox@gmail.com>

		// clean the "to" string to only get email address
		temp := strings.IndexByte(to, '<')
		if temp >= 0 {
			to = to[strings.IndexByte(to, '<')+1 : strings.IndexByte(to, '>')]
		}

		// clean the "from" string to only get email address
		temp = strings.IndexByte(from, '<')
		if temp >= 0 {
			from = from[strings.IndexByte(from, '<')+1 : strings.IndexByte(from, '>')]
		}

		// checking if its a sent or received mail
		if from == template.ID {
			sentEmails++
			// increment number of times user sent an email to a contact

			// check if the contact has been initialized in the map, initialize if not done
			_, initialized := contactMap[to]
			if !initialized {
				contactMap[to] = &contactCounter{0, 0}
			}
			contactMap[to].sent++
			// if it's not sent by user, it must be a received email
		} else {
			receivedEmails++
			// count words in subject and add it to the map
			countWords(wordMap, subject)
			// increment number of times user received an email from a contact

			// check if the contact has been initialized in the map, initialize if not done
			_, initialized := contactMap[from]
			if !initialized {
				contactMap[from] = &contactCounter{0, 0}
			}
			contactMap[from].received++

			// increment hour when email was received, only count received because time when you
			// send is not too useful
			timeVal := time.Unix(mail.InternalDate/1000, 0)
			hourReceived := timeVal.Hour()
			hourCounts[hourReceived]++
		}

	}
	// fill in data to Day
	template.Sent = sentEmails
	template.Received = receivedEmails
	template.Received0 = hourCounts[0]
	template.Received1 = hourCounts[1]
	template.Received2 = hourCounts[2]
	template.Received3 = hourCounts[3]
	template.Received4 = hourCounts[4]
	template.Received5 = hourCounts[5]
	template.Received6 = hourCounts[6]
	template.Received7 = hourCounts[7]
	template.Received8 = hourCounts[8]
	template.Received9 = hourCounts[9]
	template.Received10 = hourCounts[10]
	template.Received11 = hourCounts[11]
	template.Received12 = hourCounts[12]
	template.Received13 = hourCounts[13]
	template.Received14 = hourCounts[14]
	template.Received15 = hourCounts[15]
	template.Received16 = hourCounts[16]
	template.Received17 = hourCounts[17]
	template.Received18 = hourCounts[18]
	template.Received19 = hourCounts[19]
	template.Received20 = hourCounts[20]
	template.Received21 = hourCounts[21]
	template.Received22 = hourCounts[22]
	template.Received23 = hourCounts[23]

	//get user secret key from database
	var user model.User
	err := db.Where("id = ?", template.ID).First(&user).Error
	//error handling
	if err != nil {
		return
	}
	key := user.SecretKey
	fmt.Println(key)

	// save Day to database
	db.Create(&template)

	templateWord := model.Word{ID: template.ID, Date: template.Date}
	// save all word counts from map to db
	for word, count := range wordMap {
		templateWord.Text = model.EncryptData(word, key)
		templateWord.Value = count
		db.Create(&templateWord)
	}

	//save all contact counts from map to db
	templateContact := model.Email{ID: template.ID, Date: template.Date}
	for contact, counter := range contactMap {
		templateContact.PoiEmail = model.EncryptData(contact, key)
		templateContact.Sent = counter.sent
		templateContact.Received = counter.received
		db.Create(&templateContact)
	}
}

//ProcessMailRange takes PK email addr, number of days to process from yesterday backwards and db
func ProcessMailRange(email string, countBack int, db *gorm.DB) {
	// calculate last 00:00 time
	timeVal := time.Now()
	startDay := time.Date(timeVal.Year(), timeVal.Month(), timeVal.Day(), 0, 0, 0, 0, timeVal.Location())

	// authenticate with google servers to access emails
	srv, err := authenticate(email, db)
	if err != nil {
		log.Printf("%s could not auth with Google servers : %v", consts.Error, err)
		return
	}

	// retrieve intial set of emails (countBack * 20) where 20 is rough avgerage emails per day
	downloadMail := int64(countBack * 20)
	if downloadMail > 500 {
		downloadMail = 500
	}
	messages, err := srv.Users.Messages.List("me").MaxResults(downloadMail).Do()
	if err != nil {
		log.Printf("%s could not retrieve intial set : %v", consts.Error, err)
		return
	}

	// run for loop jumping back through date range
	emailIndex := 0
	for i := 1; i <= countBack; i++ {
		// jump back {i} days
		indexDate := startDay.Add(time.Hour * -24 * time.Duration(i))

		// check if day already exists in db and quit if does
		var day model.Day
		err := db.Where("id = ? AND date = ?", email, indexDate).First(&day).Error
		if err == nil {
			log.Printf("%s Found existing record, exiting", consts.Notif)
			break
		} else if !errors.Is(err, gorm.ErrRecordNotFound) { // else if err exists and isn't err because no existing entry
			log.Fatalf("%s GORM error checking for existing day rows : %v", consts.Error, err)
		}

		// init blank array for data
		var dayEmailData []*gmail.Message
		var dayEmailTimes []time.Time

		// for loop for each email {emailIndex}
		for {
			//set headers we wish to grab
			headers := []string{"To", "From", "Subject"}
			// get email data
			mail, err := srv.Users.Messages.Get("me", messages.Messages[emailIndex].Id).Format("metadata").MetadataHeaders(headers...).Do()
			if err != nil {
				log.Printf("%s could not get email metadata : %v", consts.Error, err)
			}

			// get truncated time of email
			timeVal = time.Unix(mail.InternalDate/1000, 0)
			emailDate := time.Date(timeVal.Year(), timeVal.Month(), timeVal.Day(), 0, 0, 0, 0, timeVal.Location())

			if emailDate.After(indexDate) {
				emailIndex++
				continue // skip this email if it happened after current process date (this should only occur with emails after last nights 00:00)
			}
			if emailDate.Before(indexDate) {
				break // save and go to next day if email happened before process date
			}

			// add email data to data array
			dayEmailData = append(dayEmailData, mail)
			dayEmailTimes = append(dayEmailTimes, timeVal)

			emailIndex++
			// check overflow and download more email ids if needed
			if emailIndex >= len(messages.Messages) {
				// download 128 more emails
				messages, err = srv.Users.Messages.List("me").PageToken(messages.NextPageToken).MaxResults(128).Do()
				// reset emailIndex
				emailIndex = 0
			}
		}

		// parallel process the data
		go processDataArray(model.Day{ID: email, Date: indexDate}, dayEmailData, db)
	}
}
