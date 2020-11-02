// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"time"
)

type Day struct {
	ID         string    `json:"id" gorm:"primary_key"`
	Date       time.Time `json:"date" gorm:"primary_key"`
	Sent       int       `json:"sent"`
	Received   int       `json:"received"`
	Words      []*Word   `json:"words" gorm:"foreignKey:ID"`
	Received0  int       `json:"received_0"`
	Received1  int       `json:"received_1"`
	Received2  int       `json:"received_2"`
	Received3  int       `json:"received_3"`
	Received4  int       `json:"received_4"`
	Received5  int       `json:"received_5"`
	Received6  int       `json:"received_6"`
	Received7  int       `json:"received_7"`
	Received8  int       `json:"received_8"`
	Received9  int       `json:"received_9"`
	Received10 int       `json:"received_10"`
	Received11 int       `json:"received_11"`
	Received12 int       `json:"received_12"`
	Received13 int       `json:"received_13"`
	Received14 int       `json:"received_14"`
	Received15 int       `json:"received_15"`
	Received16 int       `json:"received_16"`
	Received17 int       `json:"received_17"`
	Received18 int       `json:"received_18"`
	Received19 int       `json:"received_19"`
	Received20 int       `json:"received_20"`
	Received21 int       `json:"received_21"`
	Received22 int       `json:"received_22"`
	Received23 int       `json:"received_23"`
	Emails     []*Email  `json:"emails"`
}

type Email struct {
	ID       string    `json:"id" gorm:"primary_key"`
	Date     time.Time `json:"date" gorm:"primary_key"`
	PoiEmail string    `json:"poi_email" gorm:"primary_key"`
	Sent     int       `json:"sent"`
	Received int       `json:"received"`
}

type Token struct {
	ID           string    `json:"id"`
	AccessToken  string    `json:"access_token"`
	TokenType    string    `json:"token_type"`
	RefreshToken string    `json:"refresh_token"`
	Expiry       time.Time `json:"expiry"`
}

type User struct {
	ID            string `json:"id"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
	Locale        string `json:"locale"`
	ColorSchemeID int    `json:"color_scheme_id"`
	SecretKey     string `json:"secret_key"`
}

type Word struct {
	ID    string    `json:"id" gorm:"primary_key"`
	Date  time.Time `json:"date" gorm:"primary_key"`
	Text  string    `json:"text" gorm:"primary_key"`
	Value int       `json:"value"`
}
