// ============================================
// routes/authRoutes.js
// This file handles user authentication
// DevTrack users can:
// 1️⃣ Register
// 2️⃣ Login
// ============================================

const express = require("express");
const router = express.Router();   // Create router instance

const bcrypt = require("bcryptjs");   // For password hashing
const jwt = require("jsonwebtoken");  // For generating login token

const User = require("../Models/User");  // Import User model


// ============================================
// REGISTER ROUTE
// URL: POST /api/auth/register
// Purpose: Create new user in DevTrack
// ============================================

router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
  console.error("Register Error:", error);
  res.status(500).json({ message: error.message });
}

});


// ============================================
// LOGIN ROUTE
// URL: POST /api/auth/login
// Purpose: Authenticate user and return JWT token
// ============================================

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },            // payload
      process.env.JWT_SECRET,      // secret key
      { expiresIn: "1d" }          // token expiry
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;   // VERY IMPORTANT
