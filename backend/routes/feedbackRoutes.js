// routes/feedbackRoutes.js
import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Route to handle feedback submission
router.post("/", async (req, res) => {
  try {
    const { rating, comments } = req.body;
    const feedback = new Feedback({ rating, comments });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

export default router;
