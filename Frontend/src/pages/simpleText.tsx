// React Imports
import { useRef, useEffect } from "react";

// Internal Imports
import { Textarea } from "../components/ui/textarea";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import ActionWrappper from "@/common/ActionWrapper";
import { TNote } from "@/features/note/notesAPI";

export default function SimpleText() {
  const { text, setText } = useNoteFetcher({ noteType: "markdown" });
  const { debouncedMutate } = useDebouncedMutation();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    const mutationData: TNote = {
      content: newText,
      hashID: location.hash.replace("#", ""),
      isProtected: false,
      noteType: "markdown",
    };

    debouncedMutate(mutationData);
  };

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
    </ActionWrappper>
  );
}
