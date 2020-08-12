package dayprocess

import (
	"context"
	"fmt"
	"insightBox/insightBox/server/gqlserver/graph/model"
	"io/ioutil"
	"log"
	"time"

	"github.com/jinzhu/gorm"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

//authenticate and connect to gmail
func authenticate(email string, db *gorm.DB) *gmail.Service {
	//get token from database
	var tokendb model.Token
	err := db.Where("id = ?", email).First(&tokendb)
	//error handling
	if err != nil {
		log.Fatalf("Unable to load db: %v", err)
	}

	//reconstruct token
	tok := &oauth2.Token{}
	tok.AccessToken = tokendb.AccessToken
	tok.TokenType = tokendb.TokenType
	tok.RefreshToken = tokendb.RefreshToken
	tok.Expiry = tokendb.Expiry

	//connect to gmail and get service
	b, e := ioutil.ReadFile("credentials.json")
	if e != nil {
		log.Fatalf("Unable to read client secret file: %v", e)
	}
	config, e := google.ConfigFromJSON(b, gmail.GmailReadonlyScope)
	if e != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", e)
	}
	client := config.Client(context.Background(), tok)
	srv, e := gmail.New(client)
	if e != nil {
		log.Fatalf("Unable to retrieve Gmail client: %v", e)
	}

	//return the service to be used
	return srv
}

func binarySearchEmail(endTime int64, srv *gmail.Service) (emailIndex int, messages *gmail.ListMessagesResponse) {
	//retrieve 128 email IDs. The maximum is 500, can be changed if needed
	//128 is a nice number for binary search
	messages, err := srv.Users.Messages.List("me").MaxResults(128).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve messages: %v", err)
	}

	//get the newest email in the list, only get minimal data since we only want the time received for now
	emailIndex = -1
	//loop until we run out of emails or we find the index
	for {
		mail, err := srv.Users.Messages.Get("me", messages.Messages[0].Id).Format("minimal").Do()
		if err != nil {
			log.Fatalf("Unable to retrieve message: %v", err)
		}

		//if endTime is before the first email, then check the last email
		if endTime < mail.InternalDate {
			//get the last email in the list
			mail, err = srv.Users.Messages.Get("me", messages.Messages[len(messages.Messages)-1].Id).Format("minimal").Do()
			if err != nil {
				log.Fatalf("Unable to retrieve message: %v", err)
			}
			//if endTime is before the last email, then load the next 128 emails
			if endTime < mail.InternalDate {
				messages, err = srv.Users.Messages.List("me").PageToken(messages.NextPageToken).MaxResults(128).Do()
			} else {
				//otherwise newest message within date range must be between first and last email in the list, binary search
				begin := 0
				end := len(messages.Messages) - 1
				middle := (begin + end) / 2
				fmt.Println("B: ", begin, "E: ", end, "M: ", middle)
				for {
					//get the middle email
					mail, err = srv.Users.Messages.Get("me", messages.Messages[middle].Id).Format("minimal").Do()
					if err != nil {
						log.Fatalf("Unable to retrieve message: %v", err)
					}
					fmt.Println("email retrieved")
					fmt.Println("target: ", endTime, "current: ", mail.InternalDate)
					//found an email at that exact time, found the latest email, break
					if endTime == mail.InternalDate || begin == middle {
						fmt.Println("found")
						emailIndex = middle
						break
					} else if endTime > mail.InternalDate {
						//end time is between start and middle
						end = middle
					} else {
						//end time is between middle and end
						begin = middle
					}
					middle = (begin + end) / 2
					fmt.Println("B: ", begin, "E: ", end, "M: ", middle)
				}

			}
		} else {
			//found the email, was first one on the list, break the loop
			emailIndex = 0
			break
		}
		if messages.NextPageToken == "" || emailIndex >= 0 {
			break
		}
	}

	return emailIndex, messages

}

//ProcessDailyMail takes an email and the database that contains their token, connects
//to gmail, and the previous days email. This should be run every night.
func ProcessDailyMail(email string, db *gorm.DB) {
	srv := authenticate(email, db)
	today := time.Now()
	year, month, day := today.Date()
	//11:59:59PM of the previous day
	endTime := time.Date(year, month, day, 0, 0, -1, 0, today.Location()).Unix() * 1000
	//12:00:00AM of the previous day
	beginTime := time.Date(year, month, day-1, 0, 0, 0, 0, today.Location()).Unix() * 1000

	//find the most recent mail before endTime
	emailIndex, messages := binarySearchEmail(endTime, srv)

	emailCount := 0

	//if no email index was found, then processing stops
	if emailIndex >= 0 {

		//get emails, read horizontally, remember they will be from newest to oldest
		for {
			if emailIndex < len(messages.Messages) {
				//load the next email
				mail, err := srv.Users.Messages.Get("me", messages.Messages[emailIndex].Id).Format("metadata").Do()
				if err != nil {
					log.Fatalf("Unable to retrieve message: %v", err)
				}
				//if loaded email was sent before begin time, break the loop,the email is not the correct days
				if mail.InternalDate < beginTime {
					break
				}
				//do stats stuff here
				emailCount++
				emailIndex++
			} else {
				if messages.NextPageToken != "" {
					//there are more emails, load the next 128 and reset the index
					var err error
					messages, err = srv.Users.Messages.List("me").PageToken(messages.NextPageToken).MaxResults(128).Do()
					if err != nil {
						log.Fatalf("Unable to retrieve messages: %v", err)
					}
					emailIndex = 0
				} else {
					//end of emails, break
					break
				}
			}
		}

		//store stats processing in db
		day := model.Day{ID: email, Date: int(beginTime), Emails: emailCount}
		db.Create(&day)
	}

}

// Takes the users email service and date range, downloads emails in that range and stores data into
// grouped days in the database.
func getMailDataRange(srv *gmail.Service, beginTime int64, endTime int64) {
	//timeframes currently forced, CHANGE ONCE FRONTEND IS COMPLETE
	//the beginning parameter to fetch emails, for now it is set at when it's run
	//multiply by 1000 because that is how google stores it
	endTime = time.Now().Unix()*1000 - 365*24*60*60*1000
	//currently finds email 1 year ago

	//the end parameter, for now set at 7 day after start
	//7 days, 24 hours in a day, 60 minutes, 60 seconds
	beginTime = endTime - 7*24*60*60*1000

	//END OF DUMMY CODE

	//there are emails, read them sequentially and store data into days in database
}
