const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const { title, description, location, wage, category, skillsRequired, expiresAt } = req.body;

    if (!title || !location || !wage) {
      return res.status(400).json({ message: "Title, location, and wage are required" });
    }

    const newJob = await Job.create({
      title,
      description,
      location,
      wage,
      category,
      skillsRequired,
      expiresAt,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      job: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error.message);
    res.status(500).json({ message: "Server error while creating job" });
  }
};