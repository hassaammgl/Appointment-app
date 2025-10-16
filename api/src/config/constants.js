import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import { validateEnv } from "./validateEnv.js";

export const ENVS = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  NODE_ENV: process.env.NODE_ENV || "development",
  DEVELOPER_SECRET: process.env.DEVELOPER_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

export const checkEnvs = async () => {
  try {
    const warnings = validateEnv();
    warnings.forEach((warning) => {
      console.log(colors.yellow("Environment Warning:"), warning);
    });
    console.log(colors.green("Environment variables validated successfully"));
    console.log(colors.cyan("Environment Mode:"), ENVS.NODE_ENV);
  } catch (error) {
    if (error instanceof Error) {
      console.error(colors.red("Environment Error:"), error.message);
    } else {
      console.error(
        colors.red("An unknown error occurred during environment validation")
      );
    }
    process.exit(1);
  }
};
