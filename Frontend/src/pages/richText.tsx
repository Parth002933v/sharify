import ActionWrapper from "@/common/ActionWrapper";
import { Editor } from "@/components/richText/editor";
import { TNote } from "@/features/note/notesAPI";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import { useHashID } from "@/hooks/useHashID";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setText } from "@/features/note/note-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { encrypt } from "@/lib/encryptionAndDecyption.ts";

export default function RichText() {
  const location = useLocation();
  const { generateAndSetHash } = useHashID();
  const { text } = useNoteFetcher({ noteType: "lexical" });
  const { debouncedMutate } = useDebouncedMutation();

  const dispatch = useAppDispatch();
  const encryptedPassword = useAppSelector(
    (state) => state.simpleNote.encrypted,
  );

  //* Handle redirection if hash not found in URL
  useEffect(() => {
    if (!location.hash) {
      generateAndSetHash();
    }
  }, [location.hash]);

  const handleTextChange = async (editorState: string) => {
    const encryptedText = await encrypt(editorState, encryptedPassword);
    dispatch(setText(editorState));

    const mutationData: TNote = {
      content: encryptedText,
      hashID: location.hash.replace("#", ""),
      isProtected: !!encryptedPassword,
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
