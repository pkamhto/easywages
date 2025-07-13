const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// ✅ Signup Controller (Already working)
exports.signup = async (req, res) => {
  try {
    const { name, email, password, age, gender, category, dob, contact } = req.body;
    const profilePic = req.file ? req.file.path : null;

    if (!name || !email || !password || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const emailLower = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: emailLower,
      password: hashedPassword,
      age,
      gender,
      category,
      dob,
      contact,
      profilePic,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        category: newUser.category,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ 🔐 Login Controller (add this below signup)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
  { userId: user._id, category: user.category },
  process.env.JWT_SECRET, // ✅ this line
  { expiresIn: "7d" }
);


    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        category: user.category,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
