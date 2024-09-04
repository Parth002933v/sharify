import { useEffect } from "react";
import { useState } from "react";
import { TNote, useFetchNoteQuery } from "@/features/note/notesAPI";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setText } from "@/features/note/note-slice";

export const useNoteFetcher = ({ noteType }: { noteType: TNote['noteType'] }) => {
    const location = useLocation();
    // const [text, setText] = useState("");

    const dispatch = useAppDispatch();
    const text = useAppSelector((state) => state.notekṅḥfds.text);


    const { data: note } = useFetchNoteQuery({ hashID: location.hash.replace("#", ""), noteType: noteType });

    useEffect(() => {
        if (note) {
            dispatch(setText(note.data.content));
        }
    }, [note]);

    return { text };
};
