package users

import (
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/processing"

	"github.com/jinzhu/gorm"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

//GetEmailFromAuthCode Takes in authcode and finds email addr
func GetEmailFromAuthCode(authCode string, db *gorm.DB) (string, error) {
	// get credentials // TODO store google.Config in place of credentials.json
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}

	// get config with credentials
	config, err := google.ConfigFromJSON(b, gmail.GmailReadonlyScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}

	// get token from authCode
	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		log.Printf("Unable to retrieve token from web: %v", err)
		return "", err
	}

	// get client with config and auth token
	client := config.Client(context.Background(), tok)

	// connect to Gmail API
	srv, err := gmail.New(client)
	if err != nil {
		log.Printf("Unable to retrieve Gmail client: %v", err)
		return "", err
	}

	// get user email as string
	user := ""
	profile, err := srv.Users.GetProfile(user).Do()
	if err != nil {
		log.Printf("Unable to retrieve email addr: %v", err)
		return "", err
	}
	email := profile.EmailAddress

	// save token in DB
	SaveToken(email, tok, client, db)

	// run processing section
	go processing.ProcessMailRange(email, time.Now().AddDate(0, 0, -14), time.Now(), db)

	// return data
	return email, nil
}

//SaveToken finds a user in database by given email addr (or creates user if none exists) and saves the new token
func SaveToken(email string, token *oauth2.Token, client *http.Client, db *gorm.DB) {
	// find user and create if can't
	var user model.User
	err := db.Model(&user).Where("id = ?", email).First(&user).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			log.Printf("User with email addr %s not found, creating", email)
			// set user default variables
			user.ID = email
			user.Name = "TODO" // TODO : find from API
			user.ColorSchemeID = 1
			// save to db
			db.Create(&user)
		} else {
			log.Printf("Error when finding user in db")
		}
		// save our token if first login
		mtoken := model.Token{ID: email, AccessToken: token.AccessToken, TokenType: token.TokenType, RefreshToken: token.RefreshToken, Expiry: token.Expiry}
		db.Create(&mtoken)
	}
}
