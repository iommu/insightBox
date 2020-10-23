package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	_ "github.com/go-sql-driver/mysql"
	"github.com/iommu/insightbox/server/graph"
	"github.com/iommu/insightbox/server/graph/generated"
	"github.com/iommu/insightbox/server/graph/model"
	"github.com/iommu/insightbox/server/internal/auth"
	"github.com/iommu/insightbox/server/internal/consts"
	"github.com/iommu/insightbox/server/internal/processing"
	"github.com/iommu/insightbox/server/internal/users"
	"github.com/rs/cors"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/people/v1"
	"gorm.io/driver/mysql"

	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

func initDB() {
	var err error

	// open maria
	dataSourceName := "group:isit321@(localhost)/insightbox?charset=utf8&parseTime=True&loc=Local"
	db, err = gorm.Open(mysql.Open(dataSourceName), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})

	if err != nil {
		log.Printf("%s error connecting to database : %v", consts.Error, err)
		panic("failed to connect database")
	}

	// Migration to create tables for User, Day and Token and Word schema
	db.AutoMigrate(&model.User{}, &model.Day{}, &model.Token{}, &model.Word{}, &model.Email{})
}

func printURL() {
	// get credentials // TODO make good
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("%s Unable to read client secret file : %v", consts.Error, err)
	}
	// get config with credentials
	config, err := google.ConfigFromJSON(b, gmail.GmailReadonlyScope, people.UserinfoProfileScope)
	if err != nil {
		log.Fatalf("%s Unable to parse client secret file to config : %v", consts.Error, err)
	}
	// TODO REMOVE
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOnline)
	log.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)
}

func main() {
	// setup command line args
	// devMode flag for if we're working on dev machines
	devMode := flag.Bool("dev", false, "a bool")
	flag.Parse()

	// print OAuth URL
	printURL()

	// connect to DB with GORM
	initDB()

	// test stuff here
	fmt.Println("encryption test")
	SK, _ := model.GetSK()
	// fmt.Println(SK)
	fmt.Println(len(SK))

	// setup 00:01 update ticker
	go processing.InitDaemon(db)

	// create router
	router := chi.NewRouter()

	// add CORS middleware around every request
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		Debug:            false,
	}).Handler)

	// connect our middleware script for JWT generation/Authentication
	router.Use(auth.Middleware(db))

	// setup GraphQL server
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}))
	router.Handle("/playground", playground.Handler("insightBox", "/api"))
	router.Handle("/api", srv)

	// find port using input environment variable (defualt 4000)
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	if *devMode {
		log.Printf("%s devmode enabled", consts.Notif)
		log.Printf("%s Use above link and paste the resulting code", consts.Notif)
		var authCode string
		if _, err := fmt.Scan(&authCode); err != nil {
			log.Fatalf("%s Unable to read authorization code: %v", consts.Error, err)
		}
		users.SignIn(authCode, db)
	}

	// start listening on {port}
	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		panic(err)
	}
}
