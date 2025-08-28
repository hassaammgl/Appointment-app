import express from "express";
import type { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import morgan from "morgan";
import { ENVS } from "./config/constants";
import { sessionMiddleware } from "./middlewares/session.middleware";
import { NotFound } from "./middlewares/notFound.middleware";

const app = express();

console.log(ENVS.CLIENT_ORIGIN);

app.use(express.json());
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: CONSTANTS.CLIENT_ORIGIN || 'http://localhost:5173',
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("combined"));

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// Error handler
app.use(errorHandler);
// Not found err
app.use(NotFound);

export default app;
