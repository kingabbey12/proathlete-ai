import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route: AI Workout Generator
app.post("/generate", async (req, res) => {
  try {
    const { goal } = req.body;

    const prompt = `
      Create a workout plan for this fitness goal: ${goal}.
      Include:
      - Warm-up
      - 4 exercises
      - Sets + reps
      - Cooldown
      Make it clear and easy.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const aiText =
      response.choices?.[0]?.message?.content || "No response generated.";

    res.json({ workout: aiText });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI failed" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("🔥 AI Server running on http://localhost:3000");
});