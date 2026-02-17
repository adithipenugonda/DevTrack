// ============================================
// Models/User.js
// This file defines how a User is stored in MongoDB
// DevTrack needs users for authentication
// ============================================

const mongoose = require("mongoose");

// Create User Schema
// Schema defines structure of user document

const userSchema = new mongoose.Schema(
  {
    // User full name
    name: {
      type: String,
      required: true
    },

    // User email (must be unique)
    email: {
      type: String,
      required: true,
      unique: true
    },

    // Hashed password (we never store plain password)
    password: {
      type: String,
      required: true
    }
  },

  // Automatically adds createdAt & updatedAt
  { timestamps: true }
);


// Export the model
// "User" will become collection name: users (lowercase plural)

module.exports = mongoose.model("User", userSchema);
