# node-crud-demo


## A simple Node CRUD backend with redis

# API
```
 GET / => returns all stored items
 ```
 ```
 POST /api/add/:key/:value => creates a new key-value pair
 ```
 ```
 POST /api/update/:key/:value => Update Value at Key entry, if it EXISTS
 ```
 ```
 POST /api/delete/:key => Delete entry at Key, if it EXISTS
 ```

## Installation

> run in the project folder
```
npm install
```
> Make sure redis server is running in the background, get it here https://redis.io/download

run
```
node app.js
```
> Visit http://localhost:8081

