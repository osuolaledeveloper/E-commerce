const express = require('express')
const app = express();

app.get("/", (req, res) => {
    res.send("hello fffform index.js")
})
app.get("/admin/signup", (req, res) =>{
res.send("<h1> Login</h1>")
})






const port = process.env.PORT || 3000
app.listen(port)
