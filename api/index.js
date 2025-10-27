import { logger } from "./src/utils/logger.js";
import { ENVS } from "./src/utils/constants.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { checkEnv } from "./src/utils/checkEnvs.js";

process.on("unhandledRejection", (reason) => {
  logger.error(
    "Unhandled Rejection:",
    reason instanceof Error ? reason.stack : reason
  );
  gracefulShutdown(1);
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.stack || err.message}`);
  gracefulShutdown(1);
});

let server;
const gracefulShutdown = (code = 0) => {
  logger.info("Shutting down gracefully...");

  if (server) {
    server.close(() => {
      logger.info("HTTP server closed.");
      process.exit(code);
    });

    setTimeout(() => {
      logger.error("Forced exit: Server did not close in time");
      process.exit(1);
    }, 10000);
  } else {
    process.exit(code);
  }
};

process.on("SIGTERM", () => gracefulShutdown(0));
process.on("SIGINT", () => gracefulShutdown(0));

(async () => {
  try {
    checkEnv();

    await connectDB();

    const PORT = ENVS.PORT ?? 5500;
    server = app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });

    server.on("listening", () => {
      logger.info("Server is ready and accepting connections");
    });
  } catch (err) {
    logger.error(
      `Failed to start application: ${err instanceof Error ? err.message : err}`
    );
    gracefulShutdown(1);
  }
})();
