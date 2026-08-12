import express from "express";

import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET ALL USERS
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

// UPDATE USER
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateUser);

// DELETE USER
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

export default router;
