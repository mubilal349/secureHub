const Activity = require("../models/Activity");

const logActivity = async ({
  userId = null,
  action,
  req = null,
  details = "",
}) => {
  try {
    await Activity.create({
      user: userId,
      action,
      ipAddress:
        req?.headers["x-forwarded-for"] || req?.socket?.remoteAddress || null,
      userAgent: req?.headers["user-agent"] || null,
      details,
    });
  } catch (error) {
    console.error("Activity logging error:", error.message);
  }
};

module.exports = logActivity;
