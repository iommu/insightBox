package users

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/iommu/insightBox/server/graph/model"

	"github.com/jinzhu/gorm"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

//comment
//GetEmailFromAuthCode Takes in authcode and finds username
func GetEmailFromAuthCode(authCode string, db *gorm.DB) (string, error) {
	// get credentials // TODO make good
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
		log.Println("Unable to retrieve token from web: %v", err)
		return "", err
	}
	// get client with config and auth token
	client := config.Client(context.Background(), tok)
	// connect to Gmail API
	srv, err := gmail.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve Gmail client: %v", err)
	}
	// get user email as string
	user := "me"
	profile, err := srv.Users.GetProfile(user).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve email addr: %v", err)
	}
	email := profile.EmailAddress
	fmt.Println(email)
	// save token in DB
	err = SaveToken(email, tok, client, db)
	if err != nil {
		log.Fatalf("Error saving token: %v", err)
	}

	return email, nil
}

//SaveToken finds a user in database by given email addr (or creates user if none exists) and saves the new token
func SaveToken(email string, token *oauth2.Token, client *http.Client, db *gorm.DB) error {
	// decode oauth token to model.Token and save to db
	mtoken := model.Token{ID: email, AccessToken: token.AccessToken, TokenType: token.TokenType, RefreshToken: token.RefreshToken, Expiry: token.Expiry}
	db.Save(&mtoken)
	// find user and create if can't
	var user model.User
	err := db.Where("id = ?", email).First(&user).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			// set user default variables
			user.ID = email
			user.Name = "TODO" // TODO : find from API
			user.ColorSchemeID = 1
			// save to db
			db.Create(&user)
		}
	}
	return nil
}
