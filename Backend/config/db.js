// =======================================
// config/db.js
// This file handles MongoDB connection
// DevTrack cannot work without database
// =======================================

const mongoose = require("mongoose");  // ODM to interact with MongoDB

const connectDB = async () => {
  try {

    // Connect to MongoDB using connection string from .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");

  } catch (error) {

    console.error(" MongoDB Connection Failed:", error.message);

    // If database fails, stop the server completely
    process.exit(1);
  }
};

module.exports = connectDB;
