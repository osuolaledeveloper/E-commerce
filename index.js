const express = require('express')
const app = express();
const route = require('./Route/Route') 
const bodyparser = require("body-parser")
const session  = require('cookie-session')
const user = require("./db") 

app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set("view engine", "ejs")

app.use(route)
app.use(session({keys: ["whdwvdfwvcwxju"]})); // session middleware
app.use(require('flash')());
 





const port = process.env.PORT || 3000
app.listen(port)
