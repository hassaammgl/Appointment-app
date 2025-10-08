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

// Export singleton instance
export const databaseErrorHandler = new DatabaseErrorHandler();

// Export the method for backward compatibility
export const handleDbError =
  databaseErrorHandler.handleDbError.bind(databaseErrorHandler);
