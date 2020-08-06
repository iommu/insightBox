package auth

import (
	"context"
	"fmt"
	"net/http"

	"github.com/jinzhu/gorm"

	"github.com/iommu/insightBox/server/graph/model"
	"github.com/iommu/insightBox/server/pkg/jwt"
)

var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

// Middleware reference handler function
func Middleware(db *gorm.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")

			// allow unauthenticated users in
			if header == "" {
				next.ServeHTTP(w, r)
				return
			}

			// validate jwt token
			tokenStr := header
			email, err := jwt.ParseToken(tokenStr)
			if err != nil {
				http.Error(w, "Invalid token", http.StatusForbidden)
				return
			}

			// create user and check if user exists in db
			var dbUser model.User
			err = db.Where("id = ?", email).First(&dbUser).Error
			if err != nil {
				http.Error(w, "User does not exist", http.StatusForbidden)
				//next.ServeHTTP(w, r) old
				return
			}

			// put it in context
			fmt.Println("abc")
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
