import { NextFunction, Request, Response } from "express";

// 404 handler
export const NotFound = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};
