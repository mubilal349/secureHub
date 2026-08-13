import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    activity: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    userRole: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
