import { Router, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import NoteModel from "../models/note-model";
import CustomError from "../utils/error-object";
import { SendResponse } from "../utils/ApiResponse";
import { createNoteValidator } from "../middlewares/note-moddleware";
import { handleCreateNote, handleGetNoteByHashID } from "../controllers/note-controller";

const router = Router()

router.get("/:hashID", handleGetNoteByHashID)

router.post("/", createNoteValidator, handleCreateNote)


export default router
