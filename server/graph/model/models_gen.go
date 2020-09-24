// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"time"
)

type Day struct {
	ID       string    `json:"id" gorm:"primary_key"`
	Date     time.Time `json:"date" gorm:"primary_key"`
	Sent     int       `json:"sent"`
	Received int       `json:"received"`
	Words    []*Word   `json:"words" gorm:"foreignKey:ID"`
}

type Email struct {
	ID       string    `json:"id" gorm:"primary_key"`
	Date     time.Time `json:"date" gorm:"primary_key"`
	PoiEmail string    `json:"poi_email" gorm:"primary_key"`
	PoiName  string    `json:"poi_name"`
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
	ColorSchemeID int    `json:"colorSchemeID"`
}

type Word struct {
	ID    string    `json:"id" gorm:"primary_key"`
	Date  time.Time `json:"date" gorm:"primary_key"`
	Text  string    `json:"text" gorm:"primary_key"`
	Value int       `json:"value"`
}
