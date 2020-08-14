cd ./frontend
screen -d -m -S react npm start
cd ../server
screen -d -m -S gql go run ./server.go
# use screen -r <name> to reconnect