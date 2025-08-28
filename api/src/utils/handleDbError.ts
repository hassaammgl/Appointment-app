import { AppError, ValidationError } from "./AppError";

interface DatabaseError extends Error {
    code?: number;
    name: string;
}

export class DatabaseErrorHandler {
    public handleDbError(error: unknown): void {
        const dbError = error as DatabaseError;
        
        if (dbError.code === 11000) {
            throw new ValidationError('Duplicate key error');
        }
        if (dbError.name === 'MongoError') {
            throw new AppError('MongoDB error occurred', 500);
        }
        throw error;
    }
}

// Export singleton instance
export const databaseErrorHandler = new DatabaseErrorHandler();

// Export the method for backward compatibility
export const handleDbError = databaseErrorHandler.handleDbError.bind(databaseErrorHandler);