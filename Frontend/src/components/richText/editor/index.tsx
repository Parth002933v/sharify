import { $getRoot, $setSelection, EditorState, LexicalEditor } from "lexical";

import {
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { CEditable, Placeholder } from "./components";
import ToolBarPlugin from "./toolBar";
import { initialConfig } from "./config";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import PlaygroundAutoLinkPlugin from "./customPlugins/AutoLinkPlugin";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

type EditorProp = {
  onChange: (editorState: EditorState) => void;
  editor: string | undefined;
};

export function Editor(prop: EditorProp) {
  return (
    <div className="relative mx-auto h-full max-w-[1100px] self-center rounded-xl drop-shadow-lg">
      <LexicalComposer initialConfig={initialConfig}>
        {/* <LexicalEditorTopBar /> */}
        <ToolBarPlugin />

        {/* <Divider /> */}
        <RichTextPlugin
          contentEditable={<CEditable />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* <OnChangePlugin onChange={prop.onChange} /> */}
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />

        {/* <TreeViewPlugin /> */}
        <PlaygroundAutoLinkPlugin />
        {/* <ImagesPlugin captionsEnabled={false} /> */}
        {/* <FloatingTextFormatToolbarPlugin /> */}

        <LoadInitialState text={prop.editor} />
        <MyOnChangePlugin onChange={prop.onChange} />
      </LexicalComposer>
    </div>
  );
}

function MyOnChangePlugin({
  onChange,
}: {
  onChange: (editorState: EditorState) => void;
}) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

function LoadInitialState({ text }: { text: string | undefined }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    // Set the editor state when it's fetched from the API
    editor.update(() => {
      if (text) {
        const parsedEditorState = editor.parseEditorState(text);
        editor.setEditorState(parsedEditorState);
      }
    });
  }, [text, editor]);

  return null;
}
