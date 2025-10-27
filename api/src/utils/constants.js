import dotenv from "dotenv";
dotenv.config();

export const ENVS = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  NODE_ENV: process.env.NODE_ENV || "development",
  DEVELOPER_SECRET: process.env.DEVELOPER_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DEBUG: process.env.DEBUG || "false",
  CLIENT_ORIGIN_PROD: process.env.CLIENT_ORIGIN_PROD,
  APP_ID: process.env.APP_ID,
  REST_API_KEY: process.env.REST_API_KEY,
};
