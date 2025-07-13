const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

// ✅ Yahan signup aur login dono import karo
const { signup, login, updateProfile } = require("../controllers/authController");


// ✅ Routes
router.post("/signup", upload.single("profilePic"), signup);
router.post("/login", login);

module.exports = router;
