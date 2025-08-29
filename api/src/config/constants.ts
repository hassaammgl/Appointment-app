import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import { validateEnv } from "./validateEnv";

interface IEnvConfig {
  PORT: string | number;
  MONGO_URI: string;
  SESSION_SECRET: string;
  CLIENT_ORIGIN: string;
  NODE_ENV: string;
  DEVELOPER_SECRET: string;
}

export const ENVS: IEnvConfig = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI as string,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN as string,
  NODE_ENV: process.env.NODE_ENV || "development",
  DEVELOPER_SECRET: process.env.DEVELOPER_SECRET as string,
  SESSION_SECRET: process.env.SESSION_SECRET as string,
};

export const checkEnvs = async (): Promise<void> => {
  console.time("Variables Validation time");
  try {
    const warnings = validateEnv();

    warnings.forEach((warning) => {
      console.log(colors.yellow("Environment Warning:"), warning);
    });

    console.log(colors.green("Environment variables validated successfully"));

    console.log(colors.cyan("Environment Mode:"), ENVS.NODE_ENV);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(colors.red("Environment Error:"), error.message);
    } else {
      console.error(
        colors.red("An unknown error occurred during environment validation")
      );
    }
    process.exit(1);
  }
  console.timeEnd("Variables Validation time");
};
