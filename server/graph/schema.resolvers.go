package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"time"

	"github.com/iommu/insightBox/server/graph/generated"
	"github.com/iommu/insightBox/server/graph/model"
)

func (r *mutationResolver) SignIn(ctx context.Context, input string) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) User(ctx context.Context) (*model.User, error) {
	var user model.User
	err := r.DB.Set("gorm:auto_preload", true).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *queryResolver) Data(ctx context.Context, start time.Time, end time.Time) ([]*model.Day, error) {
	userID := "123"
	var days []*model.Day
	err := r.DB.Set("gorm:auto_preload", true).Where("user = ? AND date BETWEEN ? AND ?", userID, start, end).Find(&days).Error
	if err != nil {
		return nil, err
	}
	return days, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
