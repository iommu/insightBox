package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/go-sql-driver/mysql"
	"github.com/iommu/insightBox/server/graph"
	"github.com/iommu/insightBox/server/graph/generated"
	"github.com/iommu/insightBox/server/graph/model"
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

	// Migration to create tables for Order and Item schema
	db.AutoMigrate(&model.User{}, &model.Day{})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	initDB()
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}))
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)
	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
