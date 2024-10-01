import connectDB from "./db";
import app from "./server";
import dotenv from "dotenv";
import { startDeleteOldDataJob } from "./cron/cron";

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  startDeleteOldDataJob();

  const server = app.listen(PORT, () => {
    console.log("app is listening on port 3000");
    console.log(`http://localhost:${PORT}/`);
  });

  process.on("uncaughtException", (err: Error) => {
    console.log(err.message);
    console.log("Unhandled exception occurred! Shutting down...");
    server.close(() => {
      process.exit(1);
    });
  });
})().catch((error: Error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});
