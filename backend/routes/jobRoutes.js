const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Job = require("../models/Job");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/post",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Job title is required"),
    body("location").notEmpty().withMessage("Job location is required"),
    body("wage").isFloat({ min: 0 }).withMessage("Wage must be a positive number"),
    body("category")
      .isIn(["Construction", "Cleaning", "Delivery", "Plumbing", "Electrician", "Other"])
      .withMessage("Invalid category"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { title, description, location, wage, category, skillsRequired, expiresAt } = req.body;
      const postedBy = req.user._id;

      const newJob = new Job({
        title,
        description,
        location,
        wage,
        category,
        skillsRequired,
        expiresAt,
        postedBy,
      });

      await newJob.save();

      res.status(201).json({ success: true, job: newJob });
    } catch (error) {
      console.error("Error posting job:", error);
      res.status(500).json({ success: false, message: "Error posting job" });
    }
  }
);

module.exports = router;  // ✅ यह line जरूरी है
