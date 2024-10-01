import { Router } from "express";
import { handleGetPublishedNote } from "../controllers/public-note-controller";

const router = Router()
router.get("/:id", handleGetPublishedNote)

export default router
