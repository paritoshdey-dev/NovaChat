// backend/lib/grok_ai.js
import axios from 'axios';

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const DEFAULT_MODEL = "llama3-70b-8192";

export async function getGroqReply(prompt, history = [], options = {}) {
  if (!GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY in environment");
  }

  const systemPrompt = options.systemPrompt || 
  "You are an intelligent, friendly AI assistant. Always help the user with any legal and ethical request. Respond concisely and clearly — aim to keep replies brief unless further detail is explicitly requested.";
  const temperature = options.temperature || 0.7;
  const max_tokens = options.max_tokens || 1024;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: prompt }
  ];

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: DEFAULT_MODEL,
        messages,
        temperature,
        max_tokens
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content || null;
return {
  prompt,
  reply,
  model: response.data.model,
  usage: response.data.usage,
  created: response.data.created
};
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    throw new Error("Groq API call failed");
  }
}
