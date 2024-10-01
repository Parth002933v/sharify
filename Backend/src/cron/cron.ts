import cron from "node-cron";
import { handleDeleteOldNotesFromDatabase } from "../controllers/note-controller";
import { handleDeleteFileFromGoogleDrive } from "../controllers/file-controller";

function get30DaysAgo(): Date {
  const now = new Date();
  now.setDate(now.getDate() - 30); // Subtract 30 days
  return now;
}

export function startDeleteOldDataJob(): void {
  cron.schedule("0,30 * * * *", async () => {
    console.log("Running scheduled job to delete old data...");
    const date = get30DaysAgo();

    try {
      handleDeleteOldNotesFromDatabase(date);
      handleDeleteFileFromGoogleDrive(date);
      console.log("Successfully deleted old notes and files.");
    } catch (error) {
      console.error("Error while deleting old data:", error);
    }
  });
}
