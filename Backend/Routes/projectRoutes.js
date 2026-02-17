// ============================================
// routes/projectRoutes.js
// This file handles project management
// DevTrack allows users to:
// 1️⃣ Add project
// 2️⃣ View projects
// 3️⃣ Update project
// 4️⃣ Delete project
// ============================================

const express = require("express");
const router = express.Router();

const Project = require("../Models/Project");
const protect = require("../Middlewares/authMiddleware");  // Protect routes


// ============================================
// GET ALL PROJECTS
// URL: GET /api/projects
// Only logged-in user can see their projects
// ============================================

router.get("/", protect, async (req, res) => {
  try {

    const projects = await Project.find({ user: req.user });

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ============================================
// ADD PROJECT
// URL: POST /api/projects
// ============================================

router.post("/", protect, async (req, res) => {
  try {

    const newProject = await Project.create({
      ...req.body,
      user: req.user   // Attach logged-in user ID
    });

    res.status(201).json(newProject);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ============================================
// GET PROJECT STATS
// URL: GET /api/projects/stats
// Purpose: Return summary of user's projects
// ============================================

router.get("/stats", protect, async (req, res) => {
  try {

    // Count total projects for logged-in user
    const total = await Project.countDocuments({
      user: req.user
    });

    // Count completed projects
    const completed = await Project.countDocuments({
      user: req.user,
      status: "Completed"
    });

    // Count projects in progress
    const inProgress = await Project.countDocuments({
      user: req.user,
      status: "In Progress"
    });

    // Count planning projects
    const planning = await Project.countDocuments({
      user: req.user,
      status: "Planning"
    });

    // Send all counts as response
    res.json({
      total,
      completed,
      inProgress,
      planning
    });

  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ============================================
// UPDATE PROJECT
// URL: PUT /api/projects/:id
// ============================================

router.put("/:id", protect, async (req, res) => {
  try {

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProject);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ============================================
// DELETE PROJECT
// URL: DELETE /api/projects/:id
// ============================================

router.delete("/:id", protect, async (req, res) => {
  try {

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
