import { Router } from "express";
import { checkNoteHashIdValidator, createNoteValidator } from "../middlewares/note-moddleware";
import { handleCheckNoteExist, handleCreateNote, handleGetNoteByHashID, handlePublishNote } from "../controllers/note-controller";

const router = Router()

router.get("/check/", checkNoteHashIdValidator, handleCheckNoteExist)
router.get("/:hashID/", handleGetNoteByHashID)
router.post("/", createNoteValidator, handleCreateNote)
router.patch("/publish/", checkNoteHashIdValidator, handlePublishNote)


export default router
