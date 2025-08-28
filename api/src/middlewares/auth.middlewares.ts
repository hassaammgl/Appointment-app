import type { Request, Response, NextFunction } from "express";
import {
	AppError,
	AuthenticationError,
	AuthorizationError,
} from "../utils/AppError";
// import { ApiResponse } from "../utils/ApiResponse";
// import User from "../models/user.model";


declare global {
	namespace Express {
		interface Request {
			user?: any; 
		}
	}
}



// declare module "express-session" {
//   interface SessionData {
//     user?: {
//       id: string;
//       username: string;
//       role: string;
//       email?: string;
//     };
//   }
// }

export const isAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.session?.user) {
    throw new AuthenticationError("Please log in to access this resource 🪵");
  }
  next();
};

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!roles.includes(req.session?.user?.role ?? "")) {
      throw new AuthorizationError(
        "You do not have permission to perform this action 🔐"
      );
    }
    next();
  };
};
