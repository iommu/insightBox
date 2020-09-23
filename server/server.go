package main

import (
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
	"github.com/iommu/insightbox/server/internal/processing"

	"github.com/jinzhu/gorm"
	"github.com/rs/cors"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/people/v1"
)

var db *gorm.DB

func initDB() {
	var err error
	dataSourceName := "group:isit321@(localhost)/insightbox?charset=utf8&parseTime=True&loc=Local"
	db, err = gorm.Open("mysql", dataSourceName)
	if err != nil {
		log.Printf("Error : error connecting to database : %v", err)
		panic("failed to connect database")
	}

	db.LogMode(true)

	// Migration to create tables for User, Day and Token and Word schema
	db.AutoMigrate(&model.User{}, &model.Day{}, &model.Token{}, &model.Word{})
}

func printURL() {
	// get credentials // TODO make good
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Error : Unable to read client secret file : %v", err)
	}
	// get config with credentials
	config, err := google.ConfigFromJSON(b, gmail.GmailReadonlyScope, people.UserinfoProfileScope)
	if err != nil {
		log.Fatalf("Error : Unable to parse client secret file to config : %v", err)
	}
	// TODO REMOVE
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOnline)
	log.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)
}

func main() {
	// print OAuth URL
	printURL()

	// connect to DB with GORM
	initDB()

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

	// start listening on {port}
	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		panic(err)
	}
}
