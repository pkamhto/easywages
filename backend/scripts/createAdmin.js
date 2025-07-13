const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("adminpassword123", 10);

    const adminUser = new User({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      category: "Employer",  // ya "Labour" bhi kar sakte ho, role se alag hota hai
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdmin();
