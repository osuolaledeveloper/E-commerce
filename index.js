const express = require('express')
const app = express();

app.get("/", (req, res) => {
    res.send("hello form index.js")
})








const port = process.env.Port || 3000
app.listen(port, () => {
    console.log("server is running on " + Port)
})