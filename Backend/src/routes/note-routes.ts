import { Router } from "express";
import { checkNoteHashIdValidator, checkNoteIdAndTypeValidator, createNoteValidator } from "../middlewares/note-moddleware";
import { handleCheckNoteExist, handleCreateNote, handleGetNoteByHashID, handlePublishNote } from "../controllers/note-controller";

const router = Router()

router.get("/check/", checkNoteHashIdValidator, handleCheckNoteExist)
router.get("/:hashID/", handleGetNoteByHashID)
router.post("/", createNoteValidator, handleCreateNote)

// use id for patch
router.patch("/publish/", checkNoteIdAndTypeValidator, handlePublishNote)


export default router
