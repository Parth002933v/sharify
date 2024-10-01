// React Imports
import React, { useEffect, useRef, useState } from "react";

// Internal Imports
import { Textarea } from "../components/ui/textarea";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import ActionWrappper from "@/common/ActionWrapper";
import { TNote } from "@/features/note/notesAPI";
import { setText } from "@/features/note/note-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import MarkdownRenderer from "@/utils/MarkdownRender";
import { encrypt } from "@/lib/encryptionAndDecyption.ts";

export default function SimpleText() {
  const [inputText, setInputText] = useState<string>("");

  const { debouncedMutate } = useDebouncedMutation();
  const { text } = useNoteFetcher({
    noteType: "markdown",
  });

  useEffect(() => {
    setInputText(text);
  }, [text]);

  // states
  const dispatch = useAppDispatch();
  const currentEditorState = useAppSelector(
    (state) => state.simpleNote.currentEditorState,
  );
  const encryptedPassword = useAppSelector(
    (state) => state.simpleNote.encrypted,
  );

  const handleTextChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newInputText = e.target.value;
    setInputText(newInputText);

    // Only encrypt if there's an encrypted password
    let encryptedText = newInputText;
    console.log("encryptedPassword: ", encryptedPassword);
    if (encryptedPassword) {
      encryptedText = await encrypt(newInputText, encryptedPassword);
    }

    dispatch(setText(newInputText));

    const mutationData: TNote = {
      content: encryptedText,
      hashID: location.hash.replace("#", ""),
      isProtected: !!encryptedPassword,
      noteType: "markdown",
    };

    console.log(mutationData);

    debouncedMutate(mutationData);
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  useEffect(() => {
    return () => {
      debouncedMutate.cancel();
    };
  }, [debouncedMutate]);

  return (
    <ActionWrappper>
      <div className="inset-0 mx-auto min-h-[900px] max-w-[1100px] rounded-md bg-white drop-shadow-lg">
        {currentEditorState == "editor" ? (
          <Textarea
            ref={textareaRef}
            className="text-md min-h-[900px] resize-none overflow-scroll"
            value={inputText}
            placeholder="Enter Your text here..."
            onChange={handleTextChange}
          />
        ) : (
          <div className="prose w-full max-w-[1100px] rounded-md px-6 py-7">
            {/* {htmlContent} */}
            <MarkdownRenderer content={text} />
          </div>
        )}
      </div>
    </ActionWrappper>
  );
}
{
  /* <ReactMarkdown
              rehypePlugins={[remarkgfm, rehypeRaw]}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={dark}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {text}
            </ReactMarkdown> */
}
