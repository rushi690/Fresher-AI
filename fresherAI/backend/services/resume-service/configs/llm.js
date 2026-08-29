import dotenv from "dotenv";

dotenv.config();

import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
  temperature: 0.2,
  maxTokens: 2500,
  maxRetries: 2,
});

export default llm;