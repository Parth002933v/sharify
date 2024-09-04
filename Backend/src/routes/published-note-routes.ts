import { Router } from "express";
import { handlGetPublishedNote } from "../controllers/public-note-controller";

const router = Router()
router.get("/:id", handlGetPublishedNote)

export default router
