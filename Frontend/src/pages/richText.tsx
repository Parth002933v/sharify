import ActionWrapper from "@/common/ActionWrapper";
import { Editor } from "@/components/richText/editor";
import { TNote } from "@/features/note/notesAPI";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import { useHashID } from "@/hooks/useHashID";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RichText() {
  const location = useLocation();
  const { generateAndSetHash } = useHashID();
  const { text } = useNoteFetcher({ noteType: "lexical" });
  const { debouncedMutate } = useDebouncedMutation();

  //* Handle redirection if hash not found in URL
  useEffect(() => {
    if (!location.hash) {
      generateAndSetHash();
    }
  }, [location.hash]);

  const handleTextChange = (editorState: string) => {
    console.log(handleTextChange);

    const mutationData: TNote = {
      content: editorState,
      hashID: location.hash.replace("#", ""),
      isProtected: false,
      noteType: "lexical",
    };
    debouncedMutate(mutationData);
  };

  useEffect(() => {
    return () => {
      if (debouncedMutate.cancel) {
        debouncedMutate.cancel();
      }
    };
  }, [debouncedMutate]);

  return (
    <ActionWrapper>
      <Editor onChange={handleTextChange} editor={text} />
    </ActionWrapper>
  );
}
