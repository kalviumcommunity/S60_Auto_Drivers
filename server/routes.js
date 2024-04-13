const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Data = require("./model.js");
const joi = require("joi");
const app = express();
app.use(express.json());
app.use(cors());


const dataSchema = joi.object({
  type: joi.string().required(),
  about: joi.string().required()
});

app.post("/data", async (req, res) => {
  try {
    
    const { error } = dataSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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


module.exports = app;
