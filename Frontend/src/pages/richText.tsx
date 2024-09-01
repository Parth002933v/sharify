import ActionWrapper from "@/common/ActionWrapper";
import { Editor } from "@/components/richText/editor";
import { TNote } from "@/features/note/notesAPI";
import { toast } from "@/hooks/use-toast";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import { useHashID } from "@/hooks/useHashID";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import { $getRoot, EditorState, createEditor } from "lexical";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RichText() {
  const location = useLocation();
  const { generateAndSetHash } = useHashID();
  //   const [editor, setEditor] = useState(() => createEditor()); // Creating the editor instance

  const { text } = useNoteFetcher({ noteType: "lexical" });
  const { debouncedMutate } = useDebouncedMutation();

  // Handle redirection if hash not found in URL
  useEffect(() => {
    if (!location.hash) {
      generateAndSetHash();
    }
  }, [location.hash]);

  //   Set the initial editor state from API
  //   useEffect(() => {
  //     if (text) {
  //       editor.update(() => {
  //         const parsedState = editor.parseEditorState(text);
  //         editor.setEditorState(parsedState);
  //       });
  //     }
  //   }, [text, editor]);

  function isEditorEmpty(editorState: EditorState) {
    let isEmpty = true;

    editorState.read(() => {
      const root = $getRoot();
      isEmpty = root.isEmpty();
    });

    return isEmpty;
  }

  const handleTextChange = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();

    const mutationData: TNote = {
      content: JSON.stringify(editorStateJSON),
      hashID: location.hash.replace("#", ""),
      isProtected: false,
      noteType: "lexical",
    };

    debouncedMutate(mutationData);
    // const root = editorState.toJSON();

    // if (!isEditorEmpty(editorState)) {
    //   const mutationData: TNote = {
    //     content: JSON.stringify(root),
    //     hashID: location.hash.replace("#", ""),
    //     isProtected: false,
    //     noteType: "lexical",
    //   };

    //   debouncedMutate(mutationData);
    // } else {
    //   toast({
    //     description: "Minimum one character is required to save your content",
    //     variant: "destructive",
    //   });
    // }
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
      <Editor
        onChange={handleTextChange}
        editor={text} // Passing the editor instance
      />
    </ActionWrapper>
  );
}
