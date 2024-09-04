import { Request } from "express";
import { asyncHandler } from "../utils/async-handler";
import NoteModel from "../models/note-model";
import { PageNotFound } from "../utils/html-content";
import { markdownIt } from "../config/MarkdownConfig";

import { createHeadlessEditor } from '@lexical/headless';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"
import { LexicalNode } from "lexical";
import { JSDOM } from "jsdom";

export const handlGetPublishedNote = asyncHandler(async (req: Request<{ id: string }>, res) => {

    const { id } = req.params

    const note = await NoteModel.findById(id)

    if (!note) { return res.send(PageNotFound) }

    if (note.noteType == "markdown") {
        const htmlContent = markdownIt.render(note.content);

        res.send(htmlContent)
    }
    else {

        
    }

})
