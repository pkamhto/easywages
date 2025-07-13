// middlewares/adminMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    // Authorization header se token nikalna (format: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];

    // Token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ko database se lana
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check karo user ka role "admin" hai ya nahi
    if (user.category !== "admin") {
      // Tumhare User model me 'category' me admin define nahi tha, isliye category ke badle role ka field hona chahiye.
      // Agar abhi User schema me role nahi hai, to pehle add karna padega.
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.user = user; // request me user info add karo
    next(); // agle middleware/route handler ko bhejo
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
