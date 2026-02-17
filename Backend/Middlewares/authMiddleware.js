// ============================================
// middleware/authMiddleware.js
// Protects private routes using JWT
// ============================================

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {

    // Token format: Bearer token_here
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;   // Attach user ID to request

    next();   // Move to next middleware / route

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
