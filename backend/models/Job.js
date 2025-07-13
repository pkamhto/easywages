const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
    },
    wage: {
      type: Number,
      required: [true, "Wage is required"],
      min: [0, "Wage must be a positive number"],
    },
    category: {
      type: String,
      enum: ['Construction', 'Cleaning', 'Delivery', 'Plumbing', 'Electrician', 'Other'],
      default: 'Other',
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);