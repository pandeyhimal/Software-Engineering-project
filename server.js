
// const express = require('express');
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const bcrypt = require("bcrypt");
// const path = require("path");
// const fs = require("fs");


// // const express = require('express');
// // const app = express();
// // const mongoose = require('mongoose');
// const User = require('./models/User'); // Your User schema
// // const bcrypt = require('bcrypt');


// // your login route goes here...

// const app = express();
// const PORT = 3000;

// app.use(express.json()); // To parse JSON body
// app.use(cors()); // Only needed if frontend is on a different port

// // app.post('/login', async (req, res) => {
// //   const { username, password } = req.body;

// //   const user = await User1.findOne({ username });

// //   if (!user) {
// //     return res.status(401).json({ message: 'Invalid username or password' });
// //   }

// //   const isMatch = await bcrypt.compare(password, user.password);
// //   if (!isMatch) {
// //     return res.status(401).json({ message: 'Invalid username or password' });
// //   }

// //   res.status(200).json({ message: 'Login successful' });
// // });


// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));     //serve uploaded files

// // Connect to MongoDB
// // mongoose.connect("mongodb://localhost:27017/registrationDB", { useNewUrlParser: true, useUnifiedTopology: true });

// // then(() => console.log("MongoDB connected"))
// // .catch(err => console.error("MongoDB connection error:", err));
// mongoose.connect("mongodb://localhost:27017/registrationDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // -----------------Multer Configuration-----------------------
// // Set up file upload with multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "./uploads";
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// //---------------------Mongoose Schema-----------------------
// // Define the User schema
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   middleName: String,
//   lastName: String,
//   dob: Date,
//   email: String,
//   contact: String,
//   address: String,
//   faculty: String,
//   semester: Number,
//   startYear: Number,
//   endYear: Number,
//   username: { type: String, unique: true },
//   password: String,
//   photo: String
// });

// // const User = mongoose.model("User", userSchema);

// //---------------Registration Route----------------------------
// // API endpoint to handle user registration
// // app.post("/api/register", upload.single("photo"), async (req, res) => {
// app.post("/api/register", (req, res) => {
//   upload.single("photo")(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       console.error("Multer error:", err);
//       return res.status(400).json({ message: "File upload error: " + err.message });
//     } else if (err) {
//       console.error("Unknown error:", err);
//       return res.status(500).json({ message: "Server error" });
//     }

//     try {
//       const { firstName, middleName, lastName, dob, email, contact, address, faculty, semester,currentYear, startYear, endYear, username, password } = req.body;

//       //Log request data for debugging
//       // console.log("Body:", req.body);
//       // console.log("File:", req.file);

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = new User({
//         firstName,
//         middleName,
//         lastName,
//         dob,
//         email,
//         contact,
//         address,
//         faculty,
//         semester: faculty === "BICTE" ? semester : undefined,
//         currentYear: faculty !== "BICTE" ? currentYear : undefined,
//         startYear,
//         endYear,
//         username,
//         password: hashedPassword,
//         photo: req.file ? req.file.path : "" // optional check
//       });

//       await newUser.save();
//       res.status(201).json({ message: "Registration successful" });
//     } catch (err) {
//       console.error("Registration error:", err);
//       res.status(500).json({ message: "Error registering user" });
//     }
//   });
// });

// // ------------API endpoint to fetch all registered users for admin panel---------
// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error("Fetch users errors:", err);
//     res.status(500).json({ message: "Error fetching users" });
//   }
// });

// //-------------------------------------------------------------------
// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// //----------------login Route-------------------------------------------

// // app.post('/login', async (req, res) => {
// //   const { username, password } = req.body;

// //   const user = await User.findOne({ username });
// //   if (!user) {
// //     return res.status(401).json({ message: 'Invalid username or password' });
// //   }

// //   const isMatch = await bcrypt.compare(password, user.password);
// //   if (!isMatch) {
// //     return res.status(401).json({ message: 'Invalid username or password' });
// //   }

// //   // On success
// //   res.status(200).json({ message: 'Login successful', username: user.username });
// // });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid username or password' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: 'Invalid username or password' });
//   }

//   res.status(200).json({ message: 'Login successful', username: user.username });
// });

// app.listen(3001, () => {
//   console.log('Server running on http://localhost:3001');
// });