// React Imports
import { useRef, useEffect } from "react";

// Internal Imports
import { Textarea } from "../components/ui/textarea";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import ActionWrappper from "@/common/ActionWrapper";
import { TNote } from "@/features/note/notesAPI";
import { setText } from "@/features/note/note-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkgfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SimpleText() {
  const { debouncedMutate } = useDebouncedMutation();
  const { text } = useNoteFetcher({ noteType: "markdown" });

  const dispatch = useAppDispatch();
  const currentEditorState = useAppSelector(
    (state) => state.notekṅḥfds.currentEditorState,
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
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
  }, [text, textareaRef.current]);

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
            className="text-md min-h-[900px] resize-none overflow-hidden"
            value={text}
            placeholder="Enter Your text here..."
            onChange={handleTextChange}
          />
        ) : (
          <div className="prose w-full max-w-[1100px] rounded-md px-6 py-7">
            <ReactMarkdown
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
            </ReactMarkdown>
          </div>
        )}
      </div>
    </ActionWrappper>
  );
}
