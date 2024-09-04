import { Router } from "express";
import { handlGetPublishedNote } from "../controllers/public-note-controller";

const router = Router()
router.get("/:hashId", handlGetPublishedNote)

export default router
