package processing

import (
	"context"
	"errors"
	"io/ioutil"
	"log"
	"regexp"
	"strings"
	"time"

	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/consts"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"gorm.io/gorm"
)

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

//countWords count the number of words in the title of an email title
func countWords(wordMap map[string]int, title string, db *gorm.DB) {
	// change all letters to lower case
	title = strings.ToLower(title)

	// remove symbols
	re, err := regexp.Compile(`[^\w]`)
	if err != nil {
		log.Fatalf("%s Error parsing regex for removing symbols : %v", consts.Error, err)
	}
	title = re.ReplaceAllString(title, " ")

	// break up the title into words delimited by space
	wordList := strings.Fields(title)

	// count words
	for _, word := range wordList {

		//check if the word has been initialized in the map
		_, initialized := wordMap[word]
		if initialized {
			//word already exists in map, add 1
			wordMap[word]++
		} else {
			//word is new, initialize it to 1
			wordMap[word] = 1
		}
	}
}

//processDataArray takes in array of gmail.MessageParts and a partially complete model.Day
func processDataArray(template model.Day, dataArray []*gmail.MessagePart, db *gorm.DB) {
	// setup saved variables
	receivedEmails := 0
	sentEmails := 0
	//wordMap := make(map[string]int)
	// interate through all payloads in array
	for _, payload := range dataArray {
		switch len := len(payload.Headers); {
		case len > 18:
			if payload.Headers[18].Value == template.ID {
				sentEmails++
			}
			fallthrough
		case len > 15:
			//go countWords(wordMap, payload.Headers[15].Value, db)
			fallthrough
		case len > 1:
			if payload.Headers[0].Value == template.ID {
				receivedEmails++
			}
		}
	}
	// fill in data
	template.Sent = sentEmails
	template.Received = receivedEmails
	// save to database
	db.Create(&template)

	// templateWord := model.Word{ID: template.ID, Date: template.Date}
	// // save all words to db
	// for word, count := range wordMap {
	// 	templateWord.Text = word
	// 	templateWord.Value = count
	// 	db.Save(&templateWord)
	// }
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
		var dayEmailData []*gmail.MessagePart

		// for loop for each email {emailIndex}
		for {
			// get email data
			mail, err := srv.Users.Messages.Get("me", messages.Messages[emailIndex].Id).Format("metadata").Do()
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
			dayEmailData = append(dayEmailData, mail.Payload)

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
