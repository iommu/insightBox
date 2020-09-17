package processing

import (
	"context"
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
	"time"

	"github.com/iommu/insightbox/server/graph/model"

	"github.com/jinzhu/gorm"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
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
func countWords(wordMap map[string]int, title string) error {
	//change all letters to lower case
	title = strings.ToLower(title)

	//remove symbols
	re, err := regexp.Compile(`[^\w]`)
	if err != nil {
		return err
	}
	title = re.ReplaceAllString(title, " ")

	//break up the title into words delimited by space
	wordList := strings.Fields(title)

	//count words
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

	return nil
}

//ProcessMailRange takes PK email addr, number of days to process from yesterday backwards and db
func ProcessMailRange(email string, countBack int, db *gorm.DB) error {
	// calculate last 00:00 time (with respect to UTC)
	_, tZone := time.Now().Zone()
	startDay := time.Now().Truncate(time.Hour * 24).Add(time.Second * time.Duration(-tZone))

	// authenticate with google servers to access emails
	srv, err := authenticate(email, db)
	if err != nil {
		return err
	}

	// retrieve intial set of emails (countBack * 20) where 20 is rough avgerage emails per day
	messages, err := srv.Users.Messages.List("me").MaxResults(int64(countBack * 20)).Do()
	if err != nil {
		return err
	}

	// run for loop jumping back through date range
	emailIndex := 0
	for i := 1; i <= countBack; i++ {
		// jump back {i} days
		indexDate := startDay.Add(time.Hour * -24 * time.Duration(i))
		fmt.Println("hello")

		// check if day already exists in db
		var day model.Day
		err := db.Where("id = ? AND date = ?", email, indexDate).First(&day).Error
		// error handing if nil error or error other the not found return {err}
		// caution : this means the function cannot fill gaps in day objs unless expressly asked because it will quit at first found day obj
		if !gorm.IsRecordNotFoundError(err) {
			return err
		}

		// setup saved variables
		receivedEmails := 0
		sentEmails := 0
		words := make(map[string]int)

		// for loop for each email {emailIndex}
		for {
			// check overflow and download more email ids if needed
			if emailIndex >= len(messages.Messages) {
				// download 128 more emails
				messages, err = srv.Users.Messages.List("me").PageToken(messages.NextPageToken).MaxResults(128).Do()
				// reset emailIndex
				emailIndex = 0
			}

			mail, err := srv.Users.Messages.Get("me", messages.Messages[emailIndex].Id).Format("metadata").Do()
			if err != nil {
				return err
			}

			emailDate := time.Unix(mail.InternalDate/1000, 0).Truncate(time.Hour * 24).Add(time.Second * time.Duration(-tZone))
			if emailDate.After(indexDate) {
				emailIndex++
				continue // skip this email if it happened after current process date (this should only occur with emails after last nights 00:00)
			}
			if emailDate.Before(indexDate) {
				break // save and go to next day if email happened before process date
			}

			// ---------- process email

			switch len := len(mail.Payload.Headers); {
			case len > 18:
				if mail.Payload.Headers[18].Value == email {
					sentEmails++
				}
				fallthrough
			case len > 15:
				countWords(words, mail.Payload.Headers[15].Value)
				fallthrough
			default:
				if mail.Payload.Headers[0].Value == email {
					receivedEmails++
				}
			}

			// ---------- end process email

			emailIndex++
		}

		// save day
		day = model.Day{ID: email, Date: indexDate, Sent: sentEmails, Received: receivedEmails}
		db.Create(&day)
		for word, count := range words {
			wordCount := model.Word{ID: email, Date: indexDate, Text: word, Value: count}
			db.Create(&wordCount)
		}
	}
	return nil
}

// func binarySearchEmail(endTime int64, srv *gmail.Service) (int, *gmail.ListMessagesResponse, error) {
// 	//retrieve 128 email IDs. The maximum is 500, can be changed if needed
// 	//128 is a nice number for binary search
// 	messages, err := srv.Users.Messages.List("me").MaxResults(128).Do()
// 	if err != nil {
// 		return -1, nil, err
// 	}

// 	//get the newest email in the list, only get minimal data since we only want the time received for now
// 	emailIndex := -1
// 	//loop until we run out of emails or we find the index
// 	for {
// 		mail, err := srv.Users.Messages.Get("me", messages.Messages[0].Id).Format("minimal").Do()
// 		if err != nil {
// 			return -1, nil, err
// 		}

// 		//if endTime is before the first email, then check the last email
// 		if endTime < mail.InternalDate {
// 			//get the last email in the list
// 			mail, err = srv.Users.Messages.Get("me", messages.Messages[len(messages.Messages)-1].Id).Format("minimal").Do()
// 			if err != nil {
// 				return -1, nil, err
// 			}
// 			//if endTime is before the last email, then load the next 128 emails
// 			if endTime < mail.InternalDate {
// 				messages, err = srv.Users.Messages.List("me").PageToken(messages.NextPageToken).MaxResults(128).Do()
// 			} else {
// 				//otherwise newest message within date range must be between first and last email in the list, binary search
// 				begin := 0
// 				end := len(messages.Messages) - 1
// 				middle := (begin + end) / 2
// 				for {
// 					//get the middle email
// 					mail, err = srv.Users.Messages.Get("me", messages.Messages[middle].Id).Format("minimal").Do()
// 					if err != nil {
// 						return -1, nil, err
// 					}
// 					//found an email at that exact time, found the latest email, break
// 					if endTime == mail.InternalDate || begin == middle {
// 						emailIndex = middle
// 						break
// 					} else if endTime > mail.InternalDate {
// 						//end time is between start and middle
// 						end = middle
// 					} else {
// 						//end time is between middle and end
// 						begin = middle
// 					}
// 					middle = (begin + end) / 2
// 				}

// 			}
// 		} else {
// 			//found the email, was first one on the list, break the loop
// 			emailIndex = 0
// 			break
// 		}
// 		if messages.NextPageToken == "" || emailIndex >= 0 {
// 			break
// 		}
// 	}

// 	return emailIndex, messages, nil

// }

// //ProcessDailyMail takes an email and the database that contains their token, connects
// //to gmail, and the previous days email. This should be run every night.
// func ProcessDailyMail(email string, inDate time.Time, db *gorm.DB) error {

// 	//setup time
// 	year, month, day := inDate.Date()
// 	//11:59:59PM of the input date
// 	endTime := time.Date(year, month, day, 0, 0, -1, 0, inDate.Location()).Unix() * 1000
// 	//12:00:00AM of the input date
// 	beginTime := time.Date(year, month, day-1, 0, 0, 0, 0, inDate.Location()).Unix() * 1000

// 	// check if day is already in DB
// 	var daydb model.Day
// 	err := db.Where("id = ? AND date = ?", email, beginTime).First(&daydb).Error
// 	// error handing
// 	if !gorm.IsRecordNotFoundError(err) {
// 		return err // will return err or nil (if err is nil)
// 	}

// 	//authenticate with google servers to access emails
// 	srv, err := authenticate(email, db)
// 	if err != nil {
// 		return err
// 	}

// 	//find the most recent mail before endTime
// 	emailIndex, messages, err := binarySearchEmail(endTime, srv)
// 	if err != nil {
// 		return err
// 	}

// 	//counting the number of emails every day
// 	sentEmails := 0
// 	receivedEmails := 0

// 	//counting the words used in email subject
// 	words := make(map[string]int)

// 	//if no email index was found, then processing stops
// 	if emailIndex >= 0 {

// 		//get emails, read horizontally, remember they will be from newest to oldest
// 		for {
// 			if emailIndex < len(messages.Messages) {
// 				//load the next email
// 				mail, err := srv.Users.Messages.Get("me", messages.Messages[emailIndex].Id).Format("metadata").Do()
// 				if err != nil {
// 					return err
// 				}
// 				//if loaded email was sent before begin time, break the loop,the email is not the correct days
// 				if mail.InternalDate < beginTime {
// 					break
// 				}
// 				//do stats stuff here
// 				//check who email is delivered and sent to, add 1 if received, add 1 if sent
// 				//done this way to get emails sent to self(add 1 to both)
// 				if mail.Payload.Headers[0].Value == email {
// 					receivedEmails++
// 				}
// 				if mail.Payload.Headers[18].Value == email {
// 					sentEmails++
// 				}

// 				//count the words
// 				countWords(words, mail.Payload.Headers[15].Value)

// 				emailIndex++
// 			} else {
// 				if messages.NextPageToken != "" {
// 					//there are more emails, load the next 128 and reset the index
// 					var err error
// 					messages, err = srv.Users.Messages.List("me").PageToken(messages.NextPageToken).MaxResults(128).Do()
// 					if err != nil {
// 						return err
// 					}
// 					emailIndex = 0
// 				} else {
// 					//end of emails, break
// 					break
// 				}
// 			}
// 		}

// 		//store stats processing in db
// 		date := time.Unix(beginTime/1000, 0)
// 		day := model.Day{ID: email, Date: date, Sent: sentEmails, Received: receivedEmails}
// 		db.Save(&day)
// 		for word, count := range words {
// 			wordCount := model.Words{ID: email, Date: date, Word: word, Count: count}
// 			db.Save(&wordCount)
// 		}

// 	}

// 	return nil

// }

// // ProcessMailRange takes an email string, start time and end time, and a db
// // loops through and calls ProcessMailDay for each day from end day to start day
// // not the most efficient way of doing it, but is cleaner and easier to change
// func ProcessMailRangeOld(email string, startDay time.Time, endDay time.Time, db *gorm.DB) error {

// 	//calculate number of days between start and end
// 	days := int(endDay.Sub(startDay).Hours() / 24)
// 	year, month, day := startDay.Date()

// 	//for every day from beginning to end, call ProcessDailyMail
// 	for i := 0; i < days; i++ {
// 		//12:00:00AM of the next day
// 		nextDay := time.Date(year, month, day+i, 0, 0, 0, 0, startDay.Location())
// 		err := ProcessDailyMail(email, nextDay, db)
// 		if err != nil {
// 			return err
// 		}
// 	}
// 	return nil
// }

// // ProcessMailSignup takes an email string, and a database
// // Downloads emails of the past week, processes them and stores the days in the database.
// // Used for when a user initially signs up
// // DEPRECATED CODE, left just in case
// func ProcessMailSignup(email string, db *gorm.DB) error {
// 	srv, err := authenticate(email, db)
// 	if err != nil {
// 		return err
// 	}

// 	today := time.Now()
// 	year, month, day := today.Date()
// 	//11:59:59PM of the previous day
// 	endTime := time.Date(year, month, day, 0, 0, -1, 0, today.Location()).Unix() * 1000
// 	//12:00:00AM of the previous day
// 	beginTime := time.Date(year, month, day-1, 0, 0, 0, 0, today.Location()).Unix() * 1000

// 	//find the last email of the previous day
// 	emailIndex, messages, err := binarySearchEmail(endTime, srv)

// 	//counting the number of emails every day
// 	sentEmails := 0
// 	receivedEmails := 0

// 	//create a Day in the database in the past week for every day in the past week
// 	for i := 0; i < 7; i++ {
// 		//if no email index was found, then processing stops
// 		if emailIndex >= 0 {

// 			//get emails, read horizontally, remember they will be from newest to oldest
// 			for {
// 				if emailIndex < len(messages.Messages) {
// 					//load the next email
// 					mail, err := srv.Users.Messages.Get("me", messages.Messages[emailIndex].Id).Format("metadata").Do()
// 					if err != nil {
// 						return err
// 					}
// 					//if loaded email was sent before begin time, break the loop,the email is not the correct days
// 					if mail.InternalDate < beginTime {
// 						//end of day, store a Day into the db
// 						date := time.Unix(beginTime/1000, 0)
// 						day := model.Day{ID: email, Date: date, Sent: sentEmails, Received: receivedEmails}
// 						db.Save(&day)

// 						//reset email count
// 						sentEmails = 0
// 						receivedEmails = 0

// 						break
// 					}
// 					//do stats stuff here
// 					if mail.Payload.Headers[0].Value == email {
// 						receivedEmails++
// 					}
// 					if mail.Payload.Headers[18].Value == email {
// 						sentEmails++
// 					}
// 					emailIndex++
// 				} else {
// 					if messages.NextPageToken != "" {
// 						//there are more emails, load the next 128 and reset the index
// 						var err error
// 						messages, err = srv.Users.Messages.List("me").PageToken(messages.NextPageToken).MaxResults(128).Do()
// 						if err != nil {
// 							return err
// 						}
// 						emailIndex = 0
// 					} else {
// 						//end of emails, break
// 						break
// 					}
// 				}
// 			}
// 		}

// 		//subtract 1 day(24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
// 		endTime -= 86400000
// 		beginTime -= 86400000
// 	}

// 	return nil

// }