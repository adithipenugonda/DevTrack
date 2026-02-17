// ============================================
// Models/Project.js
// This file defines how a Project is stored
// Each project belongs to a specific user
// DevTrack tracks development progress
// ============================================

const mongoose = require("mongoose");


// Create Project Schema

const projectSchema = new mongoose.Schema(
  {
    // Reference to User (owner of project)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Project title
    title: {
      type: String,
      required: true
    },

    // Project description
    description: {
      type: String
    },

    // Tech stack used (array of strings)
    techStack: [
      {
        type: String
      }
    ],

    // Project status
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed"],
      default: "Planning"
    },

    // Optional GitHub link
    githubLink: {
      type: String
    }
  },

  // Adds createdAt & updatedAt automatically
  { timestamps: true }
);


// Export model
module.exports = mongoose.model("Project", projectSchema);
