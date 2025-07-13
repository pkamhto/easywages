require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express(); // Initialize Express app

// Middlewares
app.use(express.json()); // For parsing JSON requests

// CORS setup to allow requests from frontend (React app running on localhost:3000)
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

// Serve static files (e.g., profile images) from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");

// Use Routes
app.use("/api/auth", authRoutes);   // Public auth routes like signup/login
app.use("/api/admin", adminRoutes); // Admin routes
app.use("/api/jobs", jobRoutes);    // Job related routes
app.use("/api/user", userRoutes);   // User profile and other protected routes

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
});
