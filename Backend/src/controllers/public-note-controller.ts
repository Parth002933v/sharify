import { Request } from "express";
import { asyncHandler } from "../utils/async-handler";
import NoteModel from "../models/note-model";
import { PageNotFound } from "../utils/html-content";

// import { markdownIt } from "../config/MarkdownConfig";




export const handlGetPublishedNote = asyncHandler(async (req: Request<{ hashId: string }>, res) => {

    const { hashId } = req.params

    const note = await NoteModel.findOne({ hashID: hashId })

    if (!note) { return res.send(PageNotFound) }

    if (note.noteType == "markdown") {
        // const htmlContent = markdownIt.render(note.content);

        res.send("htmlContent")
    }

    // res.send("htmlContent")



})
