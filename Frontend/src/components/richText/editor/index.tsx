import { LexicalComposer } from "@lexical/react/LexicalComposer";
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
  onChange: (editorState: string) => void;
  editor: string | undefined;
};

export function Editor(prop: EditorProp) {
  return (
    <div className="relative mx-auto h-full max-w-[1100px] self-center rounded-xl drop-shadow-lg">
      <LexicalComposer initialConfig={initialConfig}>
        {/* <LexicalEditorTopBar /> */}
        <ToolBarPlugin />
        <RichTextPlugin
          contentEditable={<CEditable />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <PlaygroundAutoLinkPlugin />
        {/* <ImagesPlugin captionsEnabled={false} /> */}
        {/* <FloatingTextFormatToolbarPlugin /> */}
        <LoadInitialState text={prop.editor} />
        <OnTextChange onChange={prop.onChange} />
      </LexicalComposer>
    </div>
  );
}

//*=================================================================================
function OnTextChange({
  onChange,
}: {
  onChange: (editorState: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterUpdateListener = editor.registerUpdateListener(
      ({ editorState, dirtyLeaves }) => {
        if (dirtyLeaves.size > 0) {
          const editorStateJSON = editorState.toJSON();
          onChange(JSON.stringify(editorStateJSON));
        }
      },
    );
    return () => {
      unregisterUpdateListener();
    };
  }, [editor, onChange]);

  return null;
}

function LoadInitialState({ text }: { text: string | undefined }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      if (text) {
        const parsedEditorState = editor.parseEditorState(text);
        editor.setEditorState(parsedEditorState);
      }
    });
  }, [text, editor]);

  return null;
}
