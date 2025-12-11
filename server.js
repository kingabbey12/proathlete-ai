import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------
//  OPENAI CLIENT
// -------------------------
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// -------------------------
// TEST ROUTE
// -------------------------
app.get("/", (req, res) => {
  res.send("🔥 ProAthlete AI Backend Running");
});

// -------------------------
// AI MEAL PLAN ROUTE
// -------------------------
app.post("/api/meal", async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ error: "Missing goal field" });
    }

    const ai = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a fitness meal plan generator." },
        { role: "user", content: `Create a meal plan for: ${goal}` },
      ],
    });

    res.json({
      mealPlan: ai.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Meal plan generation failed" });
  }
});

// -------------------------
// AI SPORTS TRAINING ROUTE
// -------------------------
app.post("/api/sports", async (req, res) => {
  try {
    const { sport } = req.body;

    if (!sport) {
      return res.status(400).json({ error: "Missing sport field" });
    }

    const ai = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You create sports training drills." },
        { role: "user", content: `Create a training plan for: ${sport}` },
      ],
    });

    res.json({
      sportsPlan: ai.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sports plan generation failed" });
  }
});

// -------------------------
// START SERVER
// -------------------------
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🔥 AI Server Running on Port ${PORT}`);
});