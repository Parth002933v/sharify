import { Router } from "express";
import {
  handleFileDownload,
  handleFileUpload,
} from "../controllers/file-controller";
import { upload } from "../middlewares/multer-middleware";

const router = Router();

router.post("/upload", upload.single("file"), handleFileUpload);
router.get("/", (_, res) => {
  res.send("No file had been found");
});
router.get("/file/:fileId", handleFileDownload);

export default router;
