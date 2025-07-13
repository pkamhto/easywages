const User = require("../models/User");
const Job = require("../models/Job");

const getAdminStats = async (req, res) => {
  try {
    const totalLabours = await User.countDocuments({ category: "Labour" });
    const totalEmployers = await User.countDocuments({ category: "Employer" });
    const activeJobs = await Job.countDocuments({ isActive: true });

    res.status(200).json({
      totalLabours,
      totalEmployers,
      activeJobs,
    });
  } catch (error) {
    console.error("❌ Admin Stats Error:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { getAdminStats };
