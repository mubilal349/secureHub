import Message from "../models/Message.js";
import User from "../models/User.js";

// ==========================================
// SEND MESSAGE
// POST /api/messages
// ==========================================

export const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;

    if (!receiver || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Receiver and message are required",
      });
    }

    // Check receiver
    const receiverUser = await User.findById(receiver);

    if (!receiverUser) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    // Prevent sending message to yourself
    if (req.user._id.toString() === receiver.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a message to yourself",
      });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver,
      message: message.trim(),
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "name email role")
      .populate("receiver", "name email role");

    res.status(201).json({
      success: true,
      message: populatedMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

// ==========================================
// GET CONVERSATION
// GET /api/messages/:userId
// ==========================================

// ==========================================
// GET CONVERSATION
// GET /api/messages/:userId
// ==========================================

export const getConversation = async (req, res) => {
  try {
    const currentUser = req.user;
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;

    // Check other user exists
    const user = await User.findById(otherUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent user from requesting their own conversation
    if (currentUserId.toString() === otherUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation",
      });
    }

    // ==========================================
    // GET BOTH SIDES OF CONVERSATION
    // ==========================================

    const messages = await Message.find({
      $or: [
        {
          sender: currentUserId,
          receiver: otherUserId,
        },
        {
          sender: otherUserId,
          receiver: currentUserId,
        },
      ],
    })
      .populate("sender", "name email role")
      .populate("receiver", "name email role")
      .sort({ createdAt: 1 });

    // ==========================================
    // MARK RECEIVED MESSAGES AS READ
    // ==========================================

    await Message.updateMany(
      {
        sender: otherUserId,
        receiver: currentUserId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
          readAt: new Date(),
        },
      },
    );

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get conversation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load conversation",
    });
  }
};

// ==========================================
// GET ALL MESSAGES
// ADMIN ONLY
// GET /api/messages/admin
// ==========================================

export const getAllMessages = async (req, res) => {
  try {
    // Admin authorization
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    const messages = await Message.find()
      .populate("sender", "name email role")
      .populate("receiver", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get all messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load communications",
    });
  }
};
