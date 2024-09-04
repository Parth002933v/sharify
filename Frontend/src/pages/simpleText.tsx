// React Imports
import { useRef, useEffect } from "react";

// Internal Imports
import { Textarea } from "../components/ui/textarea";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import ActionWrappper from "@/common/ActionWrapper";
import { TNote } from "@/features/note/notesAPI";
import { isMarkdown as checkMarkDown } from "@/utils/utils";
import { setMarkDown, setText } from "@/features/note/note-slice";
import { useAppDispatch } from "@/store/hooks";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import MarkdownRenderer from "@/utils/MarkdownRender";

export default function SimpleText() {
  const { debouncedMutate } = useDebouncedMutation();
  const { text } = useNoteFetcher({ noteType: "markdown" });
  const dispatch = useAppDispatch();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    // dispatch(setMarkDown(checkMarkDown(newText)));
    dispatch(setText(newText));

    const mutationData: TNote = {
      content: newText,
      hashID: location.hash.replace("#", ""),
      isProtected: false,
      noteType: "markdown",
    };
    debouncedMutate(mutationData);
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    return () => {
      debouncedMutate.cancel();
    };
  }, [debouncedMutate]);

  return (
    <ActionWrappper>
      <Textarea
        ref={textareaRef}
        className="text-md inset-0 mx-auto min-h-[900px] max-w-[1100px] resize-none overflow-hidden bg-white drop-shadow-lg"
        value={text}
        placeholder="Enter Your text here..."
        onChange={handleTextChange}
      />
      <MarkdownRenderer content={text} />
    </ActionWrappper>
  );
}
