import Activity from "../models/Activity.js";

const createActivity = async ({
  user = null,
  userRole = null,
  type,
  activity,
  description,
  req,
}) => {
  try {
    const newActivity = await Activity.create({
      user,
      userRole,
      type,
      activity,
      description,

      ipAddress:
        req?.headers?.["x-forwarded-for"] || req?.socket?.remoteAddress || null,

      userAgent: req?.headers?.["user-agent"] || null,
    });

    console.log("Activity created:", newActivity);

    return newActivity;
  } catch (error) {
    console.error("Activity creation error:", error.message);

    return null;
  }
};

export default createActivity;
