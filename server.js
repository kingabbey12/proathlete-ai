import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------------
//  AI ENDPOINTS
// ----------------------------

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Meal Plan AI
app.post("/meal", async (req, res) => {
  try {
    const { goal } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional meal plan generator." },
        { role: "user", content: `Create a 3-day meal plan for this goal: ${goal}` }
      ]
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Meal AI Error" });
  }
});

// Workout AI
app.post("/workout", async (req, res) => {
  try {
    const { goal } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a fitness coach." },
        { role: "user", content: `Create a full workout plan for: ${goal}` }
      ]
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Workout AI Error" });
  }
});

// Sports AI
app.post("/sports", async (req, res) => {
  try {
    const { sport } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a sports performance expert." },
        { role: "user", content: `Give drills + training plan for: ${sport}` }
      ]
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Sports AI Error" });
  }
});

// ----------------------------
//  FIXED PORT (USE 5050, NOT 5000)
// ----------------------------

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🔥 AI Server Running on Port ${PORT}`);
});