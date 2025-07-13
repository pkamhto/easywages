const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      min: 14,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    category: {
      type: String,
      enum: ["Labour", "Employer", "admin"],
      required: [true, "User category is required"],
    },
    dob: {
      type: Date,
    },
    contact: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    trustScore: {
      type: Number,
      default: 3.0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",  // Normal user by default
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
