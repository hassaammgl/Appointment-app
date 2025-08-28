export type ErrorStatus = "fail" | "error";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: ErrorStatus;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.name = "AppError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public readonly name = "ValidationError";

  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  public readonly name = "AuthenticationError";

  constructor(message: string = "Authentication failed") {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  public readonly name = "AuthorizationError";

  constructor(message: string = "Not authorized") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  public readonly name = "NotFoundError";

  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  public readonly name = "ConflictError";

  constructor(message: string = "Resource conflict") {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  public readonly name = "InternalServerError";

  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}

export class BadRequestError extends AppError {
  public readonly name = "BadRequestError";

  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

export class RateLimitError extends AppError {
  public readonly name = "RateLimitError";

  constructor(message: string = "Too many requests") {
    super(message, 429);
  }
}
