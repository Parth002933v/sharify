import { isMarkdown } from "@/utils/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface INoteState {
    isMarkDown: boolean,
    text: string
    currentEditorState: "markdown" | "editor"
}

const initState: INoteState = {
    isMarkDown: false,
    text: '',
    currentEditorState: "editor"
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
        toggleEditorState: (state) => {
            if (state.currentEditorState == "editor") {
                state.currentEditorState = "markdown"
            } else {
                state.currentEditorState = "editor"
            }
        }
    }
})

export const { setMarkDown, setText, toggleEditorState } = simpleNoteSlice.actions

export default simpleNoteSlice.reducer
