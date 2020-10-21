package model

import (
	"fmt"
	"io/ioutil"

	"gorm.io/gorm"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

/* Encrypt/Decrypt functions */

// Kyber KeyGen
// privateKey, publicKey, _ := kyberk2so.KemKeypair768()

func GetSK() {
	// open file
	keys, err := ioutil.ReadFile("server_keys.txt")
	check(err)
	//fmt.Print(string(keys))
	fmt.Println(" ")

	// read in key into byte array
	// trim string to get SK array
	SK := keys[5436:len(keys)]
	fmt.Print(string(SK))
	fmt.Println(" ")

	//

}

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
