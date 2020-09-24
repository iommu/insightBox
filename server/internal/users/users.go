package users

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"reflect"

	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/consts"
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
		log.Fatalf("%s Unable to read client secret file : %v", consts.Error, err)
	}
	// get config with credentials
	config, err := google.ConfigFromJSON(b, gmail.GmailReadonlyScope, people.UserinfoProfileScope)
	if err != nil {
		log.Fatalf("%s Unable to parse client secret file to config : %v", consts.Error, err)
	}
	// get token from authCode
	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		log.Printf("%s Unable to retrieve token from web : %v", consts.Error, err)
		return "", err
	}
	// get client with config and auth token
	client := config.Client(context.Background(), tok)

	// connect to People API
	res, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		log.Printf("%s Error requesting user profile : %v", consts.Error, err)
		return "", err
	}
	if res.Body != nil {
		defer res.Body.Close()
	}
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Printf("%s no content in user profile request body : %v", consts.Error, err)
		return "", err
	}
	var user model.User
	err = json.Unmarshal(body, &user)
	if err != nil {
		log.Printf("%s Error, unmarshaling json for user info : %v", consts.Error, err)
		return "", err
	}
	// connect to Gmail API
	srv, err := gmail.New(client)
	if err != nil {
		log.Printf("%s Unable to retrieve Gmail client : %v", consts.Error, err)
		return "", err
	}
	// get user email as string
	srvUser := ""
	profile, err := srv.Users.GetProfile(srvUser).Do()
	if err != nil {
		log.Printf("%s Unable to retrieve email addr : %v", consts.Error, err)
		return "", err
	}

	// add email(id) from gmail API to user data
	user.ID = profile.EmailAddress

	// by this point we have User{id, picture, locale, given_name, family_name}

	// find user and create if can't
	var tempUser model.User
	err = db.Model(&tempUser).Where("id = ?", user.ID).First(&tempUser).Error
	if gorm.IsRecordNotFoundError(err) { // if no current user with PK
		log.Printf("%s User with email addr %s not found, creating", consts.Notif, user.ID)
		// set user default variables for user
		user.ColorSchemeID = 1
	} else if err != nil {
		log.Fatalf("%s GORM error connecting to db : %v", consts.Error, err)
	}
	// Save(Create/Update) user to db
	err = db.Save(&user).Error
	if err != nil {
		log.Printf("%s Error saving user to database : %v", consts.Error, err)
		return "", err
	}

	// update our token
	token := model.Token{ID: user.ID, AccessToken: tok.AccessToken, TokenType: tok.TokenType, Expiry: tok.Expiry}
	err = db.Model(&token).Where("id = ?", user.ID).First(&token).Error
	// if token.RefreshToken is not "" then use it
	log.Println(tok.RefreshToken, reflect.TypeOf(tok.RefreshToken))
	if string(tok.RefreshToken) != "" {
		token.RefreshToken = tok.RefreshToken
	}
	db.Model(&token).Updates(token)

	// run processing section
	log.Printf("%s processing user %s", consts.Notif, user.ID)
	go processing.ProcessMailRange(user.ID, 62, db)

	return user.ID, nil
}
