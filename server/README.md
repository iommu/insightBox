# server
The golang based GraphQL server. Used for authentication, data storage/ retrival, API

## Module breakdown
gqlgen : provided the basis for the entire server, automatically builds golang structs from the .graphql schema file and generates all the code for GraphQL requests
GORM   : manages database and provides go functions to do database operations

## Folder structure
├── graph 
    contains all code the GraphQL schema including auto generated schematic for resolver functions and modules for acting on the schema
├── internal 
    contains all code modules for server actions outside of vanilla GraphQL e.g. authentication, processing, signup
└── pkg
    contains all externally created packages, namely the Json Web Token package

## Files of interest
- server.go : this is the main go file and all code in called from there
- makefile  : used for running gqlgen functions for generating code

