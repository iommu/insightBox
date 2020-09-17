package users

import (
	"encoding/json"
	"io/ioutil"
	"log"

	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/processing"

	"github.com/jinzhu/gorm"
	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/people/v1"
)

//SignIn gets new token for user and saves/updates user account, returns Email (and error)
func SignIn(authCode string, db *gorm.DB) (string /*Email*/, error) {
	// get credentials // TODO store google.Config in place of credentials.json
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}
	// get config with credentials
	config, err := google.ConfigFromJSON(b, gmail.GmailReadonlyScope, people.UserinfoProfileScope)
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

	// connect to People API
	res, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		log.Println("Error requesting user profile ", err)
		return "", err
	}
	if res.Body != nil {
		defer res.Body.Close()
	}
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Println("Error, no content in user profile request body ", err)
		return "", err
	}
	var user model.User
	err = json.Unmarshal(body, &user)
	if err != nil {
		log.Println("Error, unmarshaling json for user info ", err)
		return "", err
	}
	// connect to Gmail API
	srv, err := gmail.New(client)
	if err != nil {
		log.Printf("Unable to retrieve Gmail client: %v", err)
		return "", err
	}
	// get user email as string
	srvUser := ""
	profile, err := srv.Users.GetProfile(srvUser).Do()
	if err != nil {
		log.Printf("Unable to retrieve email addr: %v", err)
		return "", err
	}

	// add email(id) from gmail API to user data
	user.ID = profile.EmailAddress

	// by this point we have User{id, picture, locale, given_name, family_name}

	// find user and create if can't
	if db.NewRecord(&user) { // if no current user with PK
		log.Printf("User with email addr %s not found, creating", user.ID)
		// set user default variables for user
		user.ColorSchemeID = 1
	}
	// Save(Create/Update) user to db
	err = db.Save(&user).Error
	if err != nil {
		log.Printf("Error saving user to database: %v", err)
		return "", err
	}

	// update our token if not first login
	token := model.Token{ID: user.ID, AccessToken: tok.AccessToken, TokenType: tok.TokenType, RefreshToken: tok.RefreshToken, Expiry: tok.Expiry}
	if db.NewRecord(&token) {
		db.Save(&token)
	}

	// run processing section
	go processing.ProcessMailRange(user.ID, 14, db)

	return user.ID, nil
}
