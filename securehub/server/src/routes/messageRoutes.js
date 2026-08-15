import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  sendMessage,
  getConversation,
  getAllMessages,
} from "../controllers/messageController.js";

const router = express.Router();

// ==========================================
// ADMIN → GET ALL COMMUNICATIONS
// ==========================================

router.get("/admin", authMiddleware, getAllMessages);

// ==========================================
// USER → SEND MESSAGE
// ==========================================

router.post("/", authMiddleware, sendMessage);

// ==========================================
// USER → GET CONVERSATION
// ==========================================

router.get("/:userId", authMiddleware, getConversation);

export default router;
