// // Node.js + Express
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/loginDemo", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB error:", err));

// // User model
// const User = mongoose.model("User", new mongoose.Schema({
//   username: String,
//   password: String // In real projects, always hash passwords!
// }));

// // Login API
// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username, password });
//   if (user) {
//     res.status(200).json({ message: "Login successful" });
//   } else {
//     res.status(401).json({ message: "Invalid username or password" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/registrationDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Set up file upload with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  dob: Date,
  email: String,
  contact: String,
  address: String,
  faculty: String,
  semester: Number,
  startYear: Number,
  endYear: Number,
  username: { type: String, unique: true },
  password: String,
  photo: String
});

const User = mongoose.model("User", userSchema);

// API endpoint to handle user registration
app.post("/api/register", upload.single("photo"), async (req, res) => {
  try {
    const { firstName, middleName, lastName, dob, email, contact, address, faculty, semester, startYear, endYear, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      middleName,
      lastName,
      dob,
      email,
      contact,
      address,
      faculty,
      semester,
      startYear,
      endYear,
      username,
      password: hashedPassword,
      photo: req.file.path
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// API endpoint to fetch all registered users for admin panel
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
