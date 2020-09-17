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
	Name          string `json:"name"`
	ColorSchemeID int    `json:"colorSchemeID"`
}

type Words struct {
	ID    string    `json:"id" gorm:"primary_key"`
	Date  time.Time `json:"date" gorm:"primary_key"`
	Word  string    `json:"word" gorm:"primary_key"`
	Count int       `json:"count"`
}
