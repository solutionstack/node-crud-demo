# node-crud-demo


## A simple Node CRUD backend with redis

# API

 GET / => returns all stored items
 POST /api/add/:key/:value => creates a new key-value pair
 POST /api/update/:key/:value => Update Value at Key entry, if it EXISTS
 POST /api/delete/:key => Delete entry at Key, if it EXISTS
