// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import process from "node:process";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/api/ask", async (req, res) => {
  try {
    const code = req.body?.code || "Hello World";
    const operation = req.body?.operation || "analyze my code";
    console.log("Received body:", req.body);
    console.log("Code:", code);
    console.log("Operation:", operation);

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: `Hi I have some code that I want you to ${operation}. Here is the code: ${code}`,
        },
        {
          role: "system",
          content:
            "You are a high level and professional software engineer, your core competency is to analyze and improve code quality, and also provide constructive feedback, where your primary focus is to make me better at coding since I am a beginner. and kindly keep your replies short.",
        },
      ],
      temperature: 0.2,
    });

    const aiResponse =
      completion.choices?.[0]?.message?.content || "No response from AI";

    return res.json({ message: aiResponse, data: req.body });
  } catch (error) {
    console.error("Groq error:", error);
    return res.status(500).json({
      message: "Error occurred while processing the request.",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
