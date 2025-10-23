import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import morgan from "morgan";
import { ENVS } from "./config/constants.js";
import { sessionMiddleware } from "./middlewares/session.middleware.js";
import { NotFound } from "./middlewares/notFound.middleware.js";

const app = express();

console.log(ENVS.CLIENT_ORIGIN);

app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENVS.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("tiny"));

app.get("/api/ping", (_req, res) => {
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
