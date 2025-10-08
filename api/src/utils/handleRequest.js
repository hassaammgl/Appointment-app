import { AppError, ValidationError } from "./AppError.js";

export class RequestHandler {
  async handleRequest({
    req,
    res,
    next,
    service,
    serviceArgs = [],
    successStatus = 200,
    successMessage = "Success",
  }) {
    try {
      try {
        const result = await service(...serviceArgs);
        if (!result) throw new AppError("Operation failed", 500);

        const responseData = {
          message: successMessage,
          ...(typeof result === "object" ? result : { success: true }),
        };

        res.status(successStatus).json(responseData);
      } catch (dbError) {
        const error = dbError;
        if (error.code === 11000) {
          throw new ValidationError("Duplicate key error in DB 🚨");
        } else if (error.name === "MongoError") {
          throw new AppError("Database error occurred", 500);
        }
        throw dbError;
      }
    } catch (err) {
      next(err);
    }
  }
}

// Export singleton instance
export const requestHandler = new RequestHandler();

// Export the method for backward compatibility
export const handleRequest = requestHandler.handleRequest.bind(requestHandler);
