import Activity from "../models/Activity.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error("GET ACTIVITIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};
