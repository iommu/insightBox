package model

import (
	"io/ioutil"
	"strconv"
	"strings"

	kyberk2so "github.com/symbolicsoft/kyber-k2so"

	"gorm.io/gorm"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

/* Encrypt/Decrypt functions */

// GetSK returns secret key from file on server
func GetSK() ([2400]byte, error) {
	// open file
	keys, err := ioutil.ReadFile("server_keys.txt")
	check(err)

	// read in key into byte array
	// trim string to get SK array
	SK := keys[5443 : len(keys)-1]
	//fmt.Print(string(SK))

	str := string(SK)

	// read string into array of bytes (length 2400)
	var secretKey [2400]byte
	s := strings.Split(str, ", ")
	for i := 0; i < 2400; i++ {
		num, _ := strconv.Atoi(s[i])
		secretKey[i] = byte(num)
	}
	// return byte array of secret key
	return secretKey, nil
}

// DecryptSymmetricKey decrypts c using SK to get ss
func DecryptSymmetricKey(c [1088]byte) ([32]byte, error) {

	secretKey, _ := GetSK()

	ss, _ := kyberk2so.KemDecrypt768(c, secretKey)

	return ss, nil
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
