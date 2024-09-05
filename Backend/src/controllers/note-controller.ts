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

const handleGetNoteByHashID = asyncHandler(async (req: Request<{ hashID: string }, {}, {}, { noteType: string }>, res: Response) => {
    const { hashID } = req.params
    const { noteType } = req.query

    console.log(noteType);

    const note = await NoteModel.findOne({ hashID: hashID, noteType: noteType ? noteType.toLowerCase() : "markdown" }).select("-__v -updatedAt")

    if (!note) throw new CustomError({ message: "The note is not note awailable with this hashID", statusCode: 404 })

    return SendResponse({
        res,
        statusCode: 200,
        message: "got the note",
        data: note
    })
});


const handleCheckNoteExist = asyncHandler(async (req: Request<{}, {}, { hashID: string }>, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage: string = errors.array().map(err => `${err.type}: ${err.msg}`).join("; ")
        console.log(errorMessage);

        throw new CustomError({
            message: `Validation failed: ${errorMessage}`,
            statusCode: 400,
        });
    }

    const { hashID } = req.body
    const result = await NoteModel.exists({ hashID: hashID.toString() })
    if (!result) {
        return SendResponse({ res, statusCode: 404, message: "No content is awailable with this hashID" })
    } else {
        return SendResponse({ res, statusCode: 200, message: "Got the content" })
    }
})


const handlePublishNote = asyncHandler(async (req: Request<{}, {}, { hashID: string, noteType: string }>, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage: string = errors.array().map(err => `${err.type}: ${err.msg}`).join("; ")
        console.log(errorMessage);

        throw new CustomError({
            message: `Validation failed: ${errorMessage}`,
            statusCode: 400,
        });
    }

    const { hashID, noteType } = req.body

    console.log(hashID);

    const note = await NoteModel.findOne({ hashID: hashID, noteType: noteType })

    if (!note) {
        throw new CustomError({
            message: "Note Not found. Please Check hashID and noteType if note exist",
            statusCode: 404,
        });
    }
    const publishedURl = `${req.protocol}://${req.get('host')}/${note._id}`;

    const updatedNote = await NoteModel.findByIdAndUpdate(note._id, { publishedUrl: publishedURl }, { new: true })


    return SendResponse({
        res,
        message: "Note Published Successfully!",
        statusCode: 200,
        data: {
            publishedURL: publishedURl,
            hashID: note.hashID,
            noteType: note.noteType,
            isProtected: note.isProtected,
            // isPublished: note.isPublished
        },
    });

})

export { handleCreateNote, handleGetNoteByHashID, handleCheckNoteExist, handlePublishNote };
