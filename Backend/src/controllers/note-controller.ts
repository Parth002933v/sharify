import { validationResult } from "express-validator";
import NoteModel from "../models/note-model";
import { SendResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/async-handler";
import CustomError from "../utils/error-object";
import { Request, Response } from "express";

type HandleCreateNoteReqType = {
    hashID: string;
    content: string;
    noteType: "lexical" | "markdown";
    owner: string;
    isProtected: boolean;
};

const handleCreateNote = asyncHandler(async (req: Request<{}, {}, HandleCreateNoteReqType>, res) => {
    console.log("in handleCreateNote");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const errorMessage: string = errors.array().map(err => `${err.type}: ${err.msg}`).join("; ")
        throw new CustomError({
            message: `Validation failed: ${errorMessage}`,
            statusCode: 400,
        });
    }

    const { hashID, content, noteType, owner, isProtected } = req.body;

    let note = await NoteModel.findOneAndUpdate(
        { hashID },
        { content, noteType, isProtected, owner },
        { new: true, upsert: true }
    );

    if (!note) {
        throw new CustomError({
            message: "Something went wrong",
            statusCode: 400,
        });
    }

    return SendResponse({
        res,
        message: "Note Created Successfully!",
        statusCode: 200,
        data: {
            hashID: note.hashID,
            noteType: note.noteType,
            isProtected: note.isProtected,
        },
    });
});

const handleGetNoteByHashID = asyncHandler(async (req: Request<{ hashID: string }>, res: Response) => {
    const { hashID } = req.params

    const note = await NoteModel.findOne({ hashID: hashID }).select("-_id -__v -updatedAt")

    if (!note) throw new CustomError({ message: "The note is not note awailable with this hashID", statusCode: 404 })

    return SendResponse({
        res,
        statusCode: 200,
        message: "got the note",
        data: note
    })
});

export { handleCreateNote, handleGetNoteByHashID };
