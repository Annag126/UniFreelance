// routes/chatbotRoutes.js
import express from "express";

const router = express.Router();

// Route to handle chatbot queries
router.post("/", (req, res) => {
  const { message } = req.body;

  // Basic response logic (can be expanded)
  let response;
  if (message.toLowerCase().includes("hello")) {
    response = "Hello! How can I assist you today?";
  } else {
    response = "I'm not sure about that. Can you please rephrase?";
  }

  res.status(200).json({ response });
});

export default router;
