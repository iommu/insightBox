# insightBox
An email analytics application that connects to a user's Gmail account and processes data based on their inbox.

## Language breakdown
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
and the backend can be built from the server dir using
```
go run server.go
```

Online at http://insightbox.xyz
