import mongoose from "mongoose";
import colors from "colors";
import { ENVS } from "./constants.js";

const connectDb = async () => {
	console.time("Db connected in");
	try {
		const conn = await mongoose.connect(ENVS.MONGO_URI);
		console.log(
			colors.cyan(
				`MongoDB Connected: ${conn?.connection?.db?.databaseName}`
			)
		);
	} catch (error) {
		if (error instanceof Error) {
			console.error(
				colors.red(`MongoDB Connection Error: ${error.message}`)
			);
		} else {
			console.error(
				colors.red(
					"An unknown error occurred while connecting to MongoDB"
				)
			);
		}
		process.exit(1);
	}
	console.timeEnd("Db connected in");
};

export default connectDb;
