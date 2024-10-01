import { isMarkdown } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TNote } from "./notesAPI";

export type INoteState = Partial<TNote> &
  Pick<TNote, "content"> & {
    isMarkDown: boolean;
    // text: string;
    currentEditorState: "markdown" | "editor";
    encrypted?: string;
  };

const initState: INoteState = {
  isMarkDown: false,
  content: "",
  currentEditorState: "editor",
  isProtected: false,
};

const simpleNoteSlice = createSlice({
  initialState: initState,
  name: "simpleNote",
  reducers: {
    setMarkDown: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload, "action.payload");
      state.isMarkDown = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.isMarkDown = isMarkdown(action.payload);
      state.content = action.payload;
    },
    setIsProtected: (state, action: PayloadAction<boolean>) => {
      state.isProtected = action.payload;
    },
    setPublishedURL: (state, action: PayloadAction<string | undefined>) => {
      state.publishedUrl = action.payload;
    },
    setHashID: (state, action: PayloadAction<string>) => {
      state.hashID = action.payload;
    },
    setNoteType: (state, action: PayloadAction<TNote["noteType"]>) => {
      state.noteType = action.payload;
    },
    setEncryptedPassword: (state, action: PayloadAction<string>) => {
      state.encrypted = action.payload;
    },
    toggleEditorState: (state) => {
      if (state.currentEditorState == "editor") {
        state.currentEditorState = "markdown";
      } else {
        state.currentEditorState = "editor";
      }
    },
  },
});

export const {
  setMarkDown,
  setText,
  setIsProtected,
  toggleEditorState,
  setHashID,
  setNoteType,
  setPublishedURL,
  setEncryptedPassword,
} = simpleNoteSlice.actions;

export const { name, reducer, reducerPath } = simpleNoteSlice;
