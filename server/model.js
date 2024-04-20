const { string, required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    about: {
        type: String
    }
});

module.exports = mongoose.model("Data", userSchema, "auto_drivers");
