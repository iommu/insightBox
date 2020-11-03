# insightBox
An email analytics application that connects to a user's Gmail account and processes data based on their inbox.

## Language breakdown
Webserver : NGINX (+ Let's Encrypt for HTTPS)
Frontend : React
API      : GraphQL
Server   : Go
Database : MySQL (MariaDB)

## Folder structure
├── frontend 
    contains all code relating to the React based frontend  
└── server
    contains all golang (gqlgen) code for hosting the GraphQL server interface

## Running 
the frontend can be built from the frontend dir using
``` 
npm install
npm start 
```
or to build
```
npm run build
```
and the backend can be built from the server dir using
```
go run server.go
```
or build
```
go build server.go
```

Online at http://insightbox.xyz
