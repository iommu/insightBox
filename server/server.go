package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	_ "github.com/go-sql-driver/mysql"
	"github.com/iommu/insightBox/server/graph"
	"github.com/iommu/insightBox/server/graph/generated"
	"github.com/iommu/insightBox/server/graph/model"
	"github.com/iommu/insightBox/server/internal/auth"
	"github.com/jinzhu/gorm"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

const defaultPort = "8000"

var db *gorm.DB

func initDB() {
	var err error
	dataSourceName := "group:isit321@(localhost)/insightbox?charset=utf8&parseTime=True&loc=Local"
	db, err = gorm.Open("mysql", dataSourceName)

	if err != nil {
		fmt.Println(err)
		panic("failed to connect database")
	}

	db.LogMode(true)

	// Migration to create tables for User, Day and Token schema
	db.AutoMigrate(&model.User{}, &model.Day{}, &model.Token{})
}

func printURL() {
	// get credentials // TODO make good
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}
	// get config with credentials
	config, err := google.ConfigFromJSON(b, gmail.GmailReadonlyScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	// TODO REMOVE
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)
}

func main() {
	// print url
	printURL()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	initDB()

	router := chi.NewRouter()

	router.Use(auth.Middleware(db))

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}))
	router.Handle("/", playground.Handler("Starwars", "/query"))
	router.Handle("/query", srv)

	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		panic(err)
	}

	// old
	// http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	// http.Handle("/query", srv)
	// log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	// log.Fatal(http.ListenAndServe(":"+port, nil))
}
