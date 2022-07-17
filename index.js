const express = require('express')
const app = express();
const route = require('./Route/Route') 
const user = require("./db") 
app.use(express.static('public'))
app.set("view engine", "ejs")
user.create({email: "bird of files"})
app.use(route)



const port = process.env.PORT || 3000
app.listen(port)
