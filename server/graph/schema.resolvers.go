package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"time"

	"github.com/iommu/insightbox/server/graph/generated"
	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/auth"
	"github.com/iommu/insightbox/server/internal/consts"
	"github.com/iommu/insightbox/server/internal/users"
	"github.com/iommu/insightbox/server/pkg/jwt"
	kyberk2so "github.com/symbolicsoft/kyber-k2so"
)

func (r *mutationResolver) SignIn(ctx context.Context, authCode string) (string, error) {
	// get email from authcode
	email, err := users.SignIn(authCode, r.DB)
	if err != nil {
		return "", nil
	}
	// create and serve JWT
	token, err := jwt.GenerateToken(email)
	if err != nil {
		return "", err
	}
	return token, nil
}

func (r *mutationResolver) DeleteAccount(ctx context.Context, email string) (int, error) {
	// check email = email
	emailReference := auth.ForContext(ctx)
	// check emailReference
	if emailReference == nil {
		log.Printf("%s User tried to delete account with invalid JWT", consts.Error)
		return -1, nil
	}
	if *emailReference != email {
		log.Printf("%s User with email addr %s attempted deleting account with wrong email addr", consts.Notif, *emailReference)
		return -1, nil
	}
	log.Printf("%s User with email addr %s has flagged their account for deletion", consts.Notif, *emailReference)
	// delete users account
	go users.DeleteAccount(*emailReference, r.DB)
	return 0, nil
}

func (r *queryResolver) User(ctx context.Context) (*model.User, error) {
	var user model.User
	email := auth.ForContext(ctx)
	if email == nil {
		log.Printf("%s User tried to get User data with invalid JWT", consts.Error)
		return &user, nil
	}
	err := r.DB.Where("id = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *queryResolver) Data(ctx context.Context, start time.Time, end time.Time) ([]*model.Day, error) {
	email := auth.ForContext(ctx)
	var days []*model.Day
	if email == nil {
		log.Printf("%s User tried to get Days data with invalid JWT", consts.Error)
		return days, nil
	}
	err := r.DB.Set("gorm:auto_preload", true).Where("id = ? AND date BETWEEN ? AND ?", email, start, end).Find(&days).Error
	if err != nil {
		return nil, err
	}
	for index, day := range days {
		r.DB.Where("id = ? AND date = ?", email, day.Date).Find(&days[index].Words)
	}
	return days, nil
}

func (r *queryResolver) GetCipher(ctx context.Context, cTmp string) (string, error) {
	email := auth.ForContext(ctx)
	if email == nil {
		log.Printf("%s User tried to GetCipher with invalid JWT", consts.Error)
		return "", nil
	}
	// convert cTmp from hex string to byte array
	ctmp, _ := hex.DecodeString(cTmp)
	var ctmp1 [1088]byte
	copy(ctmp1[:], ctmp)
	// get server secret key
	SK, _ := model.GetSK()
	// decrypt c_tmp with server SK to get ss_tmp
	sstmp, _ := kyberk2so.KemDecrypt768(ctmp1, SK)

	// get user's symmetric key (User.SecretKey) from db
	var user model.User
	err := r.DB.Where("id = ?", email).First(&user).Error
	if err != nil {
		return "", err
	}
	ss := user.SecretKey

	if ss == "" {
		log.Printf("%s User doesnt have a secret key", consts.Error)
		return "", nil
	}

	fmt.Println("ss hex")
	fmt.Println(ss)

	ss1, _ := hex.DecodeString(ss)

	fmt.Println("ss1 bytes")
	fmt.Println(ss1)

	// encrypt ss with ss_tmp using AES-256
	// create new cipher block from key
	//
	// cipher = encrypt(sstmp, ss)
	// sstmp is key, ss is message
	var sstmp1 []byte = sstmp[:]
	fmt.Println(len(sstmp1))
	fmt.Println("sstmp1")
	fmt.Println(sstmp1)
	block, err := aes.NewCipher(sstmp1)
	if err != nil {
		panic(err)
	}

	// The IV needs to be unique, but not secure. Therefore it's common to
	// include it at the beginning of the ciphertext.
	ciphertext := make([]byte, aes.BlockSize+len(ss1))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		panic(err)
	}

	stream := cipher.NewCTR(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], ss1)

	// cipher []byte to hex string
	cipherHex := hex.EncodeToString(ciphertext[aes.BlockSize:])

	fmt.Println("encrypted sym key")
	fmt.Println(cipherHex)

	// decrypt test
	ss2 := make([]byte, len(ss1))
	stream = cipher.NewCTR(block, iv)
	stream.XORKeyStream(ss2, ciphertext[aes.BlockSize:])

	fmt.Println("ss2")
	fmt.Println(ss2)

	// return cipher to client
	return cipherHex, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
