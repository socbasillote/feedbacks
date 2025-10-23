import express from "express";
import Feedback from "../models/Feedback.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// 🟢 GET all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server error"});
  }
});

// 🟣 POST new feedback (protected route)
router.post("/", protect, async (req, res) => {
  try {
    const {message} = req.body;
    if (!message) return res.status(400).json({ message: "Message is required" });

    const newFeedback = await Feedback.create({
        message,
        user: req.user.id,
    });

    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json({ error: "Server error"})
  }
});

export default router;
