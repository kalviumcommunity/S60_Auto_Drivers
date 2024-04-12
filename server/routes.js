const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Data = require("./model.js")
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

app.get("/getdata", async(req, res) => {
    try {
        const data = await Data.find()
        res.json(data)
    } catch (err) {
        console.error("Error in fetching data:", err)
        res.status(500).json({error: "AN error occured"})
    }
})
app.post("/data", async (req,res) => {
    try {
        const {type, about} = req.body
        const newData = new Data({
            type,
            about
        })
        await newData.save()
        res.json({message : "Data saved successfully!"})
    }catch(err) {
        console.error("Error in saving data:", err)
    }
})

module.exports = app;