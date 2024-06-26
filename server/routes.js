const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const  User  = require("./userSchema.js");
const Data = require("./model.js");
const joi = require("joi");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json());
app.use(cors());

const dataSchema = joi.object({
  type: joi.string().required(),
  about: joi.string().required(),
});

const JWT_SECRET = "your_secret_key";

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

// GET route to fetch all data associated with a specific user
app.get("/userdata/:username", async (req, res) => {
  try {
    const username = req.params.username;

    // Fetch all data associated with the provided username
    const userData = await Data.find({ username });

    // Return the data as JSON response
    res.json(userData);
  } catch (err) {
    console.error("Error in fetching user data:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/getdata", async (req, res) => {
  try {
    const isLoggedIn = true;
    if (isLoggedIn) {
      const data = await Data.find();
      return res.json(data);
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    console.error("Error in fetching data:", err);
    return res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/data", async (req, res) => {
  try {
    const { username, type, about } = req.body;
    const newData = new Data({
      username,
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

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmpass } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      confirmpass
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    return res.json({ status: true, message: "Record registered" });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error in user registration:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }
    const validPasswords = await bcrypt.compare(password, user.password);
    if (!validPasswords) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // jwt code
    const token = jwt.sign({ username: user.username }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.cookie("authToken", "uniqueTokenValue", { httpOnly: true, maxAge: 86400000 });
    res.cookie("username", username, { httpOnly: true });
    return res.json({ status: true, message: "You are successfully logged in" });
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

// this is logout route

app.get("/logout", (req, res) => {
  res.clearCookie("username");
  return res.status(200).json({ message: "Logout successful" });
});
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected endpoint accessed successfully" });
});
module.exports = app;
