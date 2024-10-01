import { Request } from "express";
import { asyncHandler } from "../utils/async-handler";
import NoteModel from "../models/note-model";
import { PageNotFound } from "../utils/html-content";
import { markdownIt } from "../config/MarkdownConfig";

import Renderer from "@tryghost/kg-lexical-html-renderer";

export const handleGetPublishedNote = asyncHandler(
  async (req: Request<{ id: string }>, res) => {
    const { id } = req.params;

    const note = await NoteModel.findById(id);

    if (!note) {
      return res.send(PageNotFound);
    }

    if (note.noteType == "markdown") {
      const htmlContent = markdownIt.render(note.content);

      res.send(htmlContent);
    } else {
      const renderer = new Renderer({
        nodes: [],
      });
      const html = await renderer.render(JSON.parse(note.content));

      return res.send(html);
    }
  },
);
