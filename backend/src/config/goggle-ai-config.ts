import { GoogleGenAI } from "@google/genai";
import { Env } from "./env-config";

export const genAi = new GoogleGenAI({
  apiKey: Env.GEMINI_API_KEY,
});

export const genAiModel = "gemini-2.0-flash";
