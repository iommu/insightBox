package model

import (
	"gorm.io/gorm"
)

/* Encrypt/Decrypt functions */

func encrypt(decrypted string) (encrypted string) {
	// do fancy stuff
	encrypted = decrypted
	return encrypted
}

func decrypt(encrypted string) (decrypted string) {
	// undo fancy stuff
	decrypted = encrypted
	return decrypted
}

/* Encrypt/Decrypt functions */

/* Token hooks */

//BeforeCreate method for model.Token
func (token *Token) BeforeCreate(tx *gorm.DB) (err error) {
	token.AccessToken = encrypt(token.AccessToken)
	return nil
}

//AfterFind method for model.Token
func (token *Token) AfterFind(tx *gorm.DB) (err error) {
	token.AccessToken = decrypt(token.AccessToken)
	return nil
}

/* Token hooks */
