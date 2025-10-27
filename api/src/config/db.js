import mongoose from "mongoose";
import { ENVS } from "../utils/constants.js";
import { logger } from "../utils/logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENVS.MONGO_URI);
    logger.success(`MongoDB Connected: ${conn?.connection?.db?.databaseName}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(colors.red(`MongoDB Connection Error: ${error.message}`));
    } else {
      console.error(
        colors.red("An unknown error occurred while connecting to MongoDB")
      );
    }
    process.exit(1);
  }
};

export default connectDB;
