package processing

import (
	"log"
	"time"

	"github.com/iommu/insightbox/server/graph/model"
	"github.com/jinzhu/gorm"
)

// embed time.Timer to allow for methods
type daemon struct {
	timer *time.Timer
}

// calculates time duration till next daemon tick
func getNextTimerDuration() time.Duration {
	now := time.Now()
	nextTick := time.Date(now.Year(), now.Month(), now.Day(), 0, 1, 0, 0, time.Local)
	if nextTick.Before(now) {
		nextTick = nextTick.Add(24 * time.Hour)
	}
	return nextTick.Sub(time.Now())
}

// creates new daemon with duration
func newDaemon() daemon {
	log.Printf("Notif : Creating new daemon")
	return daemon{time.NewTimer(getNextTimerDuration())}
}

// resets daemon to next duration
func (d *daemon) updateDaemon() {
	log.Printf("Notif : Updating daemon")
	d.timer.Reset(getNextTimerDuration())
}

//InitDaemon initilizes daemon for updating user data at 00:01
func InitDaemon(db *gorm.DB) {
	d := newDaemon()
	for {
		<-d.timer.C
		log.Printf("%s - Daemon triggered", time.Now())
		// get list of all users on db
		var users []*model.User
		db.Find(&users)
		// iterate through all users
		for _, user := range users {
			// download past 14 days (will quit if day object already exists)
			go ProcessMailRange(user.ID, 14, db)
		}
		// update daemon
		d.updateDaemon()
	}
}
