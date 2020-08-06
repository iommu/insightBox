package main

import (
	"fmt"
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

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	initDB()

	// remove later
	fmt.Println("Go to the following link in your browser then type the authorization code: \nhttps://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=378327381273-31vjgeqa3rcse30ltenokq7q4cu7ttdt.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly&state=state-token")

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
