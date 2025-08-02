import express from "express";
import { getGroqReply } from "../lib/groq_ai.js";
import BotMessage from "../models/botmessage.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getBotMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/ask-bot", protectRoute, async (req, res) => {
  const { prompt, history } = req.body;
  const userId = req.user._id;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await getGroqReply(prompt, history || []);

    await BotMessage.create({
      userId,
      prompt,
      response: response.reply,
    });

    res.status(200).json(response);
  } catch (err) {
    console.error("Bot error:", err.message);
    res.status(500).json({ error: "Failed to get bot reply" });
  }
});

router.get("/bot-history", protectRoute, getBotMessages);

export default router;
