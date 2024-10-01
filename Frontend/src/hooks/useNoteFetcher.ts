import { useEffect } from "react";
import { TNote, useFetchNoteQuery } from "@/features/note/notesAPI";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setHashID,
  setIsProtected,
  setNoteType,
  setPublishedURL,
  setText,
} from "@/features/note/note-slice";

export const useNoteFetcher = ({
  noteType,
}: {
  noteType: TNote["noteType"];
}) => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.simpleNote.content);

  const { data: note } = useFetchNoteQuery({
    hashID: location.hash.replace("#", ""),
    noteType: noteType,
  });

  useEffect(() => {
    if (note) {
      dispatch(setIsProtected(!!note.data.isProtected));
      dispatch(setText(note.data.content));
      dispatch(setPublishedURL(note.data.publishedUrl));
      dispatch(setHashID(note.data.hashID || ""));
      dispatch(setNoteType(note.data.noteType || "markdown"));
    }
  }, [note]);

  return { text };
};
