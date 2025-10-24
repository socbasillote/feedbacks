import express from "express";
import Feedback from "../models/Feedback.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// 🟢 GET all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "email");
    res.json({feedbacks});
  } catch (err) {
    res.status(500).json({ error: "Server error"});
  }
});

// Get feedbacks from the Logged-in user only
router.get("/my", protect, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user.id })
      .populate("user", "email")
      .sort({ createdAt: -1 });

      res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server error"});
  }
})

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

// DELETE /feedback/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Ensure user owns the feedback
    if (feedback.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this feedback" });
    }

    await feedback.deleteOne();
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
