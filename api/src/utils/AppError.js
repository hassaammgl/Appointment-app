export class AppError extends Error {
  statusCode;
  status;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  name = "ValidationError";

  constructor(message) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  name = "AuthenticationError";

  constructor(message = "Authentication failed") {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  name = "AuthorizationError";

  constructor(message = "Not authorized") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  name = "NotFoundError";

  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  name = "ConflictError";

  constructor(message = "Resource conflict") {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  name = "InternalServerError";

  constructor(message = "Internal server error") {
    super(message, 500);
  }
}

export class BadRequestError extends AppError {
  name = "BadRequestError";

  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class RateLimitError extends AppError {
  name = "RateLimitError";

  constructor(message = "Too many requests") {
    super(message, 429);
  }
}
