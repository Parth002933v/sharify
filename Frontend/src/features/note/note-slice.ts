import { isMarkdown } from "@/utils/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TNote } from "./notesAPI"

export type INoteState = Partial<TNote> & {
    isMarkDown: boolean,
    text: string
    currentEditorState: "markdown" | "editor"
    // publishedURL: string

}

const initState: INoteState = {
    isMarkDown: false,
    text: '',
    currentEditorState: "editor",
}

const simpleNoteSlice = createSlice({
    initialState: initState,
    name: "simpleNote",
    reducers: {
        setMarkDown: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload, "action.payload");
            state.isMarkDown = action.payload
        },
        setText: (state, action: PayloadAction<string>) => {
            state.isMarkDown = isMarkdown(action.payload)
            state.text = action.payload
        },
        // setIsPublished: (state, action: PayloadAction<boolean>) => {
        //     state.isPublished = action.payload

        // },
        setPublishedURL: (state, action: PayloadAction<string | undefined>) => {
            state.publishedURL = action.payload
        },
        setHashID: (state, action: PayloadAction<string>) => {
            state.hashID = action.payload
        },
        setNoteType: (state, action: PayloadAction<TNote["noteType"]>) => {
            state.noteType = action.payload
        },
        toggleEditorState: (state) => {
            if (state.currentEditorState == "editor") {
                state.currentEditorState = "markdown"
            } else {
                state.currentEditorState = "editor"
            }
        }
    }
})

export const { setMarkDown, setText, toggleEditorState, setHashID, setNoteType, setPublishedURL } = simpleNoteSlice.actions

export const { name, reducer, reducerPath } = simpleNoteSlice
