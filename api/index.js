import app from "./src/app.js";
import colors from "colors";
import connectDb from "./src/config/db.js";
import { checkEnvs } from "./src/config/constants.js";

(async function () {
  try {
    checkEnvs();

    await connectDb();

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(colors.green(`🚀 Server listening on port ${PORT}`));
    });

    process.on("unhandledRejection", (reason, _promise) => {
      console.error(
        colors.red.bold("🔥 Unhandled Rejection:"),
        reason instanceof Error ? reason.stack : reason
      );
      if (typeof server !== "undefined" && server.close) {
        server.close(() => process.exit(1));
      } else {
        process.exit(1);
      }
    });

    process.on("uncaughtException", (err) => {
      console.error(
        colors.bgRed.white("💥 Uncaught Exception:"),
        err.stack || err.message
      );
      process.exit(1);
    });
  } catch (err) {
    console.error(colors.red("Failed to start application:"), err);
    process.exit(1);
  }
})();
