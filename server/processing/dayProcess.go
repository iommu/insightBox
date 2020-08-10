package dayprocess

import (
	"fmt"
	"log"
	"time"

	"google.golang.org/api/gmail/v1"
)

// Takes the users email service and date range, downloads emails in that range and stores data into
// grouped days in the database.
func getMailData(srv *gmail.Service, beginTime int64, endTime int64) {
	//timeframes currently forced, CHANGE ONCE FRONTEND IS COMPLETE
	//the beginning parameter to fetch emails, for now it is set at when it's run
	//multiply by 1000 because that is how google stores it
	endTime = time.Now().Unix()*1000 - 365*24*60*60*1000
	//currently finds email 1 year ago

	//the end parameter, for now set at 7 day after start
	//7 days, 24 hours in a day, 60 minutes, 60 seconds
	beginTime = endTime - 7*24*60*60*1000

	//END OF DUMMY CODE

	//retrieve 500 email IDs. The maximum is 500, can be changed if needed
	messages, err := srv.Users.Messages.List("me").MaxResults(500).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve messages: %v", err)
	}

	//check if newest email within date range can exist within the 500 emails

	//get the newest email in the list, only get minimal data since we only want the time received for now
	var endID int = -1
	//loop until we run out of emails or we find the endID
	for {
		mail, err := srv.Users.Messages.Get("me", messages.Messages[0].Id).Format("minimal").Do()
		if err != nil {
			log.Fatalf("Unable to retrieve message: %v", err)
		}

		//if last day in range is before the first email, then check the last email
		if endTime < mail.InternalDate {
			//get the last email in the list
			mail, err = srv.Users.Messages.Get("me", messages.Messages[len(messages.Messages)-1].Id).Format("minimal").Do()
			if err != nil {
				log.Fatalf("Unable to retrieve message: %v", err)
			}
			//if the last email in the list is after the given end time, then load the next 500 emails
			if endTime < mail.InternalDate {
				messages, err = srv.Users.Messages.List("me").PageToken(messages.NextPageToken).MaxResults(500).Do()
			} else {
				//newest message within date range must be between first and last email in the list, binary search
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
						endID = middle
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
			endID = 0
			break
		}
		if messages.NextPageToken == "" || endID >= 0 {
			break
		}
	}

	//code for when there are no emails
	if endID < 0 {
		fmt.Println("Oldest email is outside of date range")
	} else {
		mail, err := srv.Users.Messages.Get("me", messages.Messages[endID].Id).Format("minimal").Do()
		if err != nil {
			log.Fatalf("Unable to retrieve message: %v", err)
		}
		fmt.Println("Time: ", mail.InternalDate, "Snippet: ", mail.Snippet)
	}

	//there are emails, read them sequentially and store data into days in database
}
