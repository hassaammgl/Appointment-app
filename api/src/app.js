import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { NotFound } from "./middlewares/not-found.middleware.js";
import { sessionMiddleware } from "./middlewares/session.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";

const app = express();
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/api/ping", (_, res) => {
	res.status(200).json({
		success: true,
		message: "Hello World",
	});
});

app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);

app.use(errorHandler);

app.use(NotFound);

export default app;
