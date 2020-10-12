package auth

import (
	"context"
	"log"
	"net/http"

	"gorm.io/gorm"

	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/consts"
	"github.com/iommu/insightbox/server/pkg/jwt"
)

var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

// Middleware reference handler function
func Middleware(db *gorm.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// get "Authorization" key from request header
			header := r.Header.Get("Authorization")

			// allow unauthenticated users in but without ability to request private data
			if header == "" {
				next.ServeHTTP(w, r)
				return
			}

			// validate jwt token
			tokenStr := header
			log.Printf("%s token attemping login : %s", consts.Notif, tokenStr)
			email, err := jwt.ParseToken(tokenStr)
			if err != nil {
				log.Printf("%s error decoding token : %v", consts.Error, err)
				http.Error(w, "Invalid token", http.StatusForbidden)
				return
			}
			log.Printf("%s token decoded as %s", consts.Notif, email)

			// check if user exists in db
			var dbUser model.User
			err = db.Where("id = ?", email).First(&dbUser).Error
			if err != nil {
				http.Error(w, "User does not exist", http.StatusForbidden)
				return
			}

			// put it in context for use in gorm queries
			ctx := context.WithValue(r.Context(), userCtxKey, &dbUser.ID)

			// and call the next with our new context
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

// ForContext finds the user from the context. REQUIRES Middleware to have run.
func ForContext(ctx context.Context) *string {
	raw, _ := ctx.Value(userCtxKey).(*string)
	return raw
}
