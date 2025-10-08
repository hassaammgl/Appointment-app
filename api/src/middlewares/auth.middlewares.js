import { AuthenticationError, AuthorizationError } from "../utils/AppError.js";

export const isAuthenticated = (req, _res, next) => {
  if (!req.session?.user) {
    throw new AuthenticationError("Please log in to access this resource 🪵");
  }
  next();
};

export const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.session?.user?.role ?? "")) {
      throw new AuthorizationError(
        "You do not have permission to perform this action 🔐"
      );
    }
    next();
  };
};
