const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const port = 3001

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.listen(port, () => {
    console.log("server is running on 3001")
})