package processing

import (
	"context"
	"errors"
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
	sent     int
	received int
}

// incrementSent/Received was done this way because it did not like
// directly incrementing the values inside the main functions
func (c *contactCounter) incrementSent() {
	c.sent++
}

func (c *contactCounter) incrementReceived() {
	c.received++
}

func makeContactCounter() contactCounter {
	return contactCounter{
		sent:     0,
		received: 0,
	}
}

//authenticate and connect to gmail
func authenticate(email string, db *gorm.DB) (*gmail.Service, error) {
	//get token from database
	var tokendb model.Token
	err := db.Where("id = ?", email).First(&tokendb).Error
	//error handling
	if err != nil {
		return nil, err
	}

	//reconstruct token
	tok := &oauth2.Token{}
	tok.AccessToken = tokendb.AccessToken
	tok.TokenType = tokendb.TokenType
	tok.RefreshToken = tokendb.RefreshToken
	tok.Expiry = tokendb.Expiry

	//connect to gmail and get service
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

	//return the service to be used
	return srv, nil
}

// processDataArray takes in array of gmail.Messages and a partially complete model.Day
func processDataArray(template model.Day, dataArray []*gmail.Message, db *gorm.DB) {
	// setup saved variables
	receivedEmails := 0
	sentEmails := 0
	wordMap := make(map[string]int)
	contactMap := make(map[string]contactCounter)
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
			//default means we got unknown/unwanted data
			default:
				log.Printf("Unknown data in Header: %v", obj)
				continue
			}
		}

		//clean the "to" string to only get email address
		temp := strings.IndexByte(to, '<')
		if temp >= 0 {
			to = to[strings.IndexByte(to, '<')+1 : strings.IndexByte(to, '>')]
		}

		//clean the "from" string to only get email address
		temp = strings.IndexByte(from, '<')
		if temp >= 0 {
			from = from[strings.IndexByte(from, '<')+1 : strings.IndexByte(from, '>')]
		}

		//checking if its a sent or received mail
		if from == template.ID {
			sentEmails++
			// increment number of times user sent an email to a contact

			// check if the contact has been initialized in the map, initialize if not done
			_, initialized := contactMap[to]
			if !initialized {
				contactMap[to] = makeContactCounter()
			}
			contact := contactMap[to]
			contact.incrementSent()
		} else {
			receivedEmails++
			// count words in subject and add it to the map
			countWords(wordMap, subject)
			// increment number of times user received an email from a contact

			// check if the contact has been initialized in the map, initialize if not done
			_, initialized := contactMap[from]
			if !initialized {
				contactMap[from] = makeContactCounter()
			}
			contact := contactMap[from]
			contact.incrementReceived()

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
	//fill in all hours
	/*
		template.received_0 = hourCounts[0]
		template.received_1 = hourCounts[1]
		template.received_2 = hourCounts[2]
		template.received_3 = hourCounts[3]
		template.received_4 = hourCounts[4]
		template.received_5 = hourCounts[5]
		template.received_6 = hourCounts[6]
		template.received_7 = hourCounts[7]
		template.received_8 = hourCounts[8]
		template.received_9 = hourCounts[9]
		template.received_10 = hourCounts[10]
		template.received_11 = hourCounts[11]
		template.received_12 = hourCounts[12]
		template.received_13 = hourCounts[13]
		template.received_14 = hourCounts[14]
		template.received_15 = hourCounts[15]
		template.received_16 = hourCounts[16]
		template.received_17 = hourCounts[17]
		template.received_18 = hourCounts[18]
		template.received_19 = hourCounts[19]
		template.received_20 = hourCounts[20]
		template.received_21 = hourCounts[21]
		template.received_22 = hourCounts[22]
		template.received_23 = hourCounts[23]
	*/

	// save Day to database
	db.Create(&template)

	templateWord := model.Word{ID: template.ID, Date: template.Date}
	// save all word counts from map to db
	for word, count := range wordMap {
		templateWord.Text = word
		templateWord.Value = count
		db.Create(&templateWord)
	}

	//save all contact counts from map to db
	templateContact := model.Email{ID: template.ID, Date: template.Date}
	for contact, counter := range contactMap {
		templateContact.PoiEmail = contact
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
		if errors.Is(err, gorm.ErrRecordNotFound) { // if found existing
			log.Printf("%s Found existing record, exiting", consts.Notif)
			break
		} else { // else if err exists and isn't err because no existing entry
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
