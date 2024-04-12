const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Data = require("./model.js");
const app = express();
app.use(express.json());
app.use(cors()); // Add CORS middleware to allow cross-origin requests

app.get("/home", (req, res) => {
  return res.json({ message: "Route is working successfully" });
});

app.post("/post", (req, res) => {
  return res.json({ message: "Your content is posted" });
});

app.put("/update", (req, res) => {
  return res.json({ message: "Your content is updated" });
});

app.delete("/delete", (req, res) => {
  return res.json({ message: "Your content is deleted" });
});

app.get("/getdata", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error("Error in fetching data:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/data", async (req, res) => {
  try {
    const { type, about } = req.body;
    const newData = new Data({
      type,
      about
    });
    await newData.save();
    res.json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error("Error in saving data:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { type, about } = req.body;
  Data.findByIdAndUpdate(id, { type, about })
    .then((data) => {
      if (!data) {
        return res.status(400).json({ error: "Error in updating" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.delete("/deleteitem/:id", (req, res) => {
  const id = req.params.id;
  Data.findByIdAndDelete(id)
    .then((deletedData) => {
      if (!deletedData) {
        return res.status(400).json({ error: "Error in deleting" });
      }
      res.json({ message: "Data deleted successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

module.exports = app;
