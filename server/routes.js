const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())

app.get("/home", (req,res) => {
    return res.json({message : "Route is working successfully"})
})

app.post("/post", (req, res) => {
    return res.json({message: "Your content is posted"})
}) 

app.put("/update", (req, res) => {
    return res.json({message: "your content is updated"})
})

app.delete("/delete", (req, res) => {
    return res.json({message : "your content is deleted"})
})

module.exports = app;