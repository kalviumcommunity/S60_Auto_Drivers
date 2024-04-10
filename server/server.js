const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use("/",route)

// MongoDB Connection
mongoose.connect("mongodb+srv://vinnugollakoti:123@cluster0.cwivpr4.mongodb.net/mydatabase?retryWrites=true&w=majority")
.then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
