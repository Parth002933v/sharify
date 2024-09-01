import { useEffect } from "react";
import { useState } from "react";
import { TNote, useFetchNoteQuery } from "@/features/note/notesAPI";
import { useLocation } from "react-router-dom";

export const useNoteFetcher = ({ noteType }: { noteType: TNote['noteType'] }) => {
    const location = useLocation();
    const [text, setText] = useState("");

    const { data: note } = useFetchNoteQuery({ hashID: location.hash.replace("#", ""), noteType: noteType });

    useEffect(() => {
        if (note) {
            setText(note.data.content);
        }
    }, [note]);

    return { text, setText };
};
