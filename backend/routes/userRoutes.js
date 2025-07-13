const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const User = require("../models/User"); // 👈 Import User model

// 🔒 Protected Route (Get Logged-in User Profile)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // 🛡️ Hide password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Protected Route Accessed",
      user,
    });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
