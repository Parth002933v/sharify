import { Router } from "express";
import { checkNoteExistValidator, createNoteValidator } from "../middlewares/note-moddleware";
import { handleCheckNoteExist, handleCreateNote, handleGetNoteByHashID } from "../controllers/note-controller";

const router = Router()

router.get("/check", checkNoteExistValidator, handleCheckNoteExist)
router.get("/:hashID", handleGetNoteByHashID)
router.post("/", createNoteValidator, handleCreateNote)


export default router
