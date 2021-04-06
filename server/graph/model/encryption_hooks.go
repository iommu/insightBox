package model

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"io"
	"io/ioutil"
	"log"
	"strconv"
	"strings"

	"github.com/apexskier/cryptoPadding"

	"github.com/iommu/insightbox/server/internal/consts"
	kyberk2so "github.com/symbolicsoft/kyber-k2so"
)

func check(e error) {
	if e != nil {
		log.Printf("%s Encryption error", e)
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

// EncryptData encrypts data before it goes into the database
func EncryptData(input string, key string) (output string) {

	// encrypt data with the user's symmetric key
	// convert hex string to byte array
	ss, _ := hex.DecodeString(key)

	// cipher = encrypt(ss, input)
	// ss is key, input is message
	block, err := aes.NewCipher(ss)
	if err != nil {
		log.Printf("%s Error in aes.NewCipher", consts.Error)
		return ""
	}
	// convert input string to byte array
	inputBytes := []byte(input)

	// add padding to byte array
	var padding cryptoPadding.PKCS7
	paddedData, _ := padding.Pad(inputBytes, 16)

	// The IV needs to be unique, but not secure. Therefore it's common to
	// include it at the beginning of the ciphertext.
	ciphertext := make([]byte, aes.BlockSize+len(paddedData))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		log.Printf("%s Error in aes rand numbers", consts.Error)
		return ""
	}

	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(ciphertext[aes.BlockSize:], paddedData)

	// cipher []byte to hex string
	cipherHex := hex.EncodeToString(ciphertext[:])

	return cipherHex
}
