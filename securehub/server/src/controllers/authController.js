import { registerUser, loginUser } from "../services/authService.js";
import createActivity from "../utils/createActivity.js";

// ==========================================
// REGISTER
// ==========================================

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const user = await registerUser({
      name,
      email,
      password,
    });

    await createActivity({
      user: user._id,
      userRole: user.role,
      type: "REGISTER",
      activity: "User Registered",
      description: "New user registered",
      req,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    return res.status(400).json({
      message: error.message,
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const { token, user } = await loginUser({
      email,
      password,
      req,
    });

    // Successful login activity
    await createActivity({
      user: user._id,
      userRole: user.role,
      type: "LOGIN_SUCCESS",
      activity: "Successful Login",
      description: "Login successful",
      req,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        ...user.toObject(),
        isLocked: user.lockUntil && user.lockUntil > new Date() ? true : false,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(401).json({
      message: error.message,
    });
  }
};
