const Activity = require("../models/Activity");

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error("Get activities error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
    });
  }
};

module.exports = {
  getActivities,
};
