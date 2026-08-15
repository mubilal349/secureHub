import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Task from "../models/Task.js";
import createActivity from "../utils/createActivity.js";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    failedLoginAttempts: 0,
    lockUntil: null,
  });

  return user;
};

// ==========================================
// LOGIN
// ==========================================

export const loginUser = async ({ email, password, req }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // ==========================================
  // CHECK LOCK
  // ==========================================

  if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
    const remainingMinutes = Math.ceil(
      (user.lockUntil.getTime() - Date.now()) / 60000,
    );

    throw new Error(
      `Your account is locked. Try again in ${remainingMinutes} minute(s).`,
    );
  }

  // ==========================================
  // LOCK EXPIRED
  // ==========================================

  if (user.lockUntil && user.lockUntil.getTime() <= Date.now()) {
    user.lockUntil = null;
    user.failedLoginAttempts = 0;

    await user.save();
  }

  // ==========================================
  // CHECK PASSWORD
  // ==========================================

  const passwordValid = await bcrypt.compare(password, user.password);

  // ==========================================
  // WRONG PASSWORD
  // ==========================================

  if (!passwordValid) {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

    // ========================================
    // LOCK AFTER 4 ATTEMPTS
    // ========================================

    if (user.failedLoginAttempts >= 4) {
      user.lockUntil = new Date(Date.now() + 60 * 60 * 1000);

      await user.save();

      // ========================================
      // CREATE ACTIVITY
      // ========================================

      const activity = await createActivity({
        user: user._id,
        userRole: user.role,
        type: "ACCOUNT_LOCKED",
        activity: "Account Locked",
        description:
          "Account automatically locked after 4 failed login attempts",
        req,
      });

      // ========================================
      // CREATE SECURITY TASK
      // ========================================

      await Task.create({
        title: "Investigate Locked Account",

        description: `Account ${user.email} was automatically locked after 4 failed login attempts. Review the user's login activity and determine whether further action is required.`,

        priority: "High",

        status: "Pending",

        // User whose account was locked
        relatedUser: user._id,

        // Activity that caused the task
        relatedActivity: activity?._id || null,

        // No specific admin assigned yet
        assignedTo: null,

        // System-generated task
        createdBy: null,

        // Give admin 24 hours to investigate
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      // ========================================
      // RETURN LOCK ERROR
      // ========================================

      throw new Error(
        "Too many failed login attempts. Your account has been locked for 60 minutes.",
      );
    }

    // ========================================
    // SAVE FAILED ATTEMPT
    // ========================================

    await user.save();

    const remaining = 4 - user.failedLoginAttempts;

    throw new Error(
      `Invalid email or password. ${remaining} attempt(s) remaining.`,
    );
  }

  // ==========================================
  // SUCCESSFUL LOGIN
  // ==========================================

  user.failedLoginAttempts = 0;
  user.lockUntil = null;

  await user.save();

  // ==========================================
  // JWT
  // ==========================================

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return {
    token,
    user,
  };
};
