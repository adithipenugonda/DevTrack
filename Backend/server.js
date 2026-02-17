// 1️. Import required packages

const express = require("express");        // Express framework to build our backend
const dotenv = require("dotenv");          // To use environment variables (.env)
const cors = require("cors");              // To allow frontend (React) to communicate with backend
const connectDB = require("./config/db");  // Function to connect MongoDB


// 2️. Load environment variables
// This reads values from .env file (like MONGO_URI, JWT_SECRET)

dotenv.config();




// 3️. Create Express application
// This initializes our backend server engine

const app = express();


// 4️. Middlewares

// Middleware 1: Parse incoming JSON data
// When user logs in or adds a project, frontend sends JSON
// This allows us to access it using req.body

app.use(express.json());


// Middleware 2: Enable CORS
// Our frontend runs on localhost:3000
// Backend runs on localhost:5000
// Since both are different origins, we need CORS

app.use(cors());


// 5️. Connect to MongoDB
// DevTrack stores:
// - Users (for authentication)
// - Projects (for tracking development progress)
// So database connection must happen before handling any requests

connectDB();


// 6️. Define Routes

// Auth Routes → handles:
// - Register user
// - Login user
// URL base path: /api/auth
// Example: POST /api/auth/login

app.use("/api/auth", require("./Routes/authRoutes"));


// Project Routes → handles:
// - Add project
// - Get all projects
// - Update project
// - Delete project
// URL base path: /api/projects
// Example: GET /api/projects

app.use("/api/projects", require("./Routes/projectRoutes"));


// 7️. Start the server

// If PORT exists in .env use that
// Otherwise default to 5000

const PORT = process.env.PORT || 5000;

// This makes our backend listen for incoming requests

app.listen(PORT, () => {
  console.log(`🚀 DevTrack Server running on port ${PORT}`);
});
