package users

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/consts"
	"github.com/iommu/insightbox/server/internal/processing"

	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/people/v1"
	"gorm.io/gorm"
)

//DeleteAccount deletes account of (email)
func DeleteAccount(email string, db *gorm.DB) error {
	// de-auth user with google so next login will grant refresh token
	err := DeAuth(email, db)
	if err != nil {
		return err
	}
	// delete all items with primary key of email from db
	err = db.Where("id = ?", email).Delete(&model.Day{}).Error
	if err != nil {
		return err
	}
	err = db.Where("id = ?", email).Delete(&model.Email{}).Error
	if err != nil {
		return err
	}
	err = db.Where("id = ?", email).Delete(&model.Token{}).Error
	if err != nil {
		return err
	}
	err = db.Where("id = ?", email).Delete(&model.User{}).Error
	if err != nil {
		return err
	}
	err = db.Where("id = ?", email).Delete(&model.Word{}).Error
	if err != nil {
		return err
	}
	log.Printf("%s user account %s deleted", consts.Notif, email)
	return nil
}

//DeAuth deoauthorized oAuth token of (email)
func DeAuth(email string, db *gorm.DB) error {
	//get token from database
	var token model.Token
	err := db.Where("id = ?", email).First(&token).Error
	if err != nil {
		return err
	}

	// replace refreshtoken with access if no refresh token was found
	if strings.Replace(token.RefreshToken, " ", "", -1) == "" {
		token.RefreshToken = token.AccessToken
	}

	// run post request for revoking tokens
	http.PostForm("https://accounts.google.com/o/oauth2/revoke", url.Values{
		"token": {token.RefreshToken}})

	return nil
}

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
	if errors.Is(err, gorm.ErrRecordNotFound) { // if no current user with PK
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

	// create blank token object and blank refresh token string
	tokenDB := model.Token{}
	refreshToken := ""

	// find existing token in db
	err = db.Model(&tokenDB).Where("id = ?", user.ID).First(&tokenDB).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		log.Printf("%s Token with email addr %s not found, creating", consts.Notif, user.ID)
	} else if err != nil {
		log.Fatalf("%s GORM error connecting to db : %v", consts.Error, err)
	}

	// if tok.RefreshToken is not "" then use it
	if string(tok.RefreshToken) != "" {
		refreshToken = tok.RefreshToken
	} else { // else then the refresh token should be in the db object
		refreshToken = tokenDB.RefreshToken
	}

	if refreshToken == "" {
		log.Printf("%s refresh token for user is blank : %v", consts.Error, err)
		// revoke access
		DeAuth(user.ID, db)
		return "", nil
	}

	// make new token object
	tokenDB = model.Token{ID: user.ID, AccessToken: tok.AccessToken, TokenType: tok.TokenType, Expiry: tok.Expiry, RefreshToken: refreshToken}
	db.Save(&tokenDB)

	// run processing section
	log.Printf("%s processing user %s", consts.Notif, user.ID)
	go processing.ProcessMailRange(user.ID, 62, db)

	return user.ID, nil
}
