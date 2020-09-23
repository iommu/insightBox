package jwt

import (
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// secret key being used to sign tokens
var (
	SecretKey = []byte("secret")
)

//GenerateToken generates a jwt token and assign a username to it's claims and return it
func GenerateToken(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	/* Create a map to store our claims */
	claims := token.Claims.(jwt.MapClaims)
	/* Set token claims */
	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Hour * 24 * 30).Unix()
	tokenString, err := token.SignedString(SecretKey)
	if err != nil {
		log.Fatalf("Error in Generating key")
		return "", err
	}
	return tokenString, nil
}

//ParseToken parses a jwt token and returns the username it it's claims
func ParseToken(tokenStr string) (string, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		username := claims["username"].(string)
		return username, nil
	} else {
		return "", err
	}
}
