import { AppError, ValidationError } from "./AppError.js";

export class DatabaseErrorHandler {
	handleDbError(error) {
		const dbError = error;

		if (dbError.code === 11000) {
			throw new ValidationError("Duplicate key error");
		}
		if (dbError.name === "MongoError") {
			throw new AppError("MongoDB error occurred", 500);
		}
		throw error;
	}
}

const databaseErrorHandler = new DatabaseErrorHandler();

export const handleDbError =
	databaseErrorHandler.handleDbError.bind(databaseErrorHandler);
