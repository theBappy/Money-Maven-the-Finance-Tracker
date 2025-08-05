import { getEnv } from "../utils/get-env";

const envConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),

  PORT: getEnv("PORT", "8000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI"),

  JWT_SECRET: getEnv("JWT_SECRET", "1947b9eab6094723659d5282cedcae91"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m") as string,

  JWT_REFRESH_SECRET: getEnv(
    "JWT_REFRESH_SECRET",
    "wCCrZA7EwpIHT1u7TmBMHWNhvEr7zxsjt1waEuw2GDDu0Tm7mcoHMkLx8hvovips"
  ),
  JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "7d") as string,

  GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),

  CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnv("CLOUDINARY_API_SECRET"),


  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  RESEND_MAILER_SENDER: getEnv("RESEND_MAILER_SENDER", ""),



  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
});

export const Env = envConfig();
