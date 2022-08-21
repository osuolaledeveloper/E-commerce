const express = require('express')
const app = express();
const route = require('./Route/Route') 
const bodyparser = require("body-parser")


app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set("view engine", "ejs")

app.use(route)

 





const port = process.env.PORT || 3000
app.listen(port)
