import ActionWrapper from "@/common/ActionWrapper";
import { Editor } from "@/components/richText/editor";
import { TNote } from "@/features/note/notesAPI";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import { EditorState } from "lexical";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHashID } from "./Dashboard";

export default function RichText() {
  const location = useLocation();
  const navigate = useNavigate();
  const { generateAndSetHash } = useHashID();

  //   handle redirection if hash Not found in url
  useEffect(() => {
    if (!location.hash) {
      generateAndSetHash();
    }
  }, [location.hash, navigate]);

  const { text } = useNoteFetcher({ noteType: "lexical" });
  const { debouncedMutate } = useDebouncedMutation();

  const handleTextChange = (editorState: EditorState) => {
    const root = editorState.toJSON().root;
    if (root.children.length == 0) {
      return;
    }
    const mutationData: TNote = {
      content: JSON.stringify(root),
      hashID: location.hash.replace("#", ""),
      isProtected: false,
      noteType: "lexical",
    };
    debouncedMutate(mutationData);
  };

  useEffect(() => {
    return () => {
      debouncedMutate.cancel();
    };
  }, [debouncedMutate]);

  return (
    <ActionWrapper>
      <Editor
        onChange={handleTextChange}
        initialState={text ? text : undefined}
      />
    </ActionWrapper>
  );
}
