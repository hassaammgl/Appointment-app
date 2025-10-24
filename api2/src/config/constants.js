import dotenv from "dotenv";
dotenv.config();

export const ENVS = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  NODE_ENV: process.env.NODE_ENV || "development",
  DEVELOPER_SECRET: process.env.DEVELOPER_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
