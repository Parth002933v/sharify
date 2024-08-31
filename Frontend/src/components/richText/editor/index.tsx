import { EditorState } from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { CEditable, Divider, Placeholder } from "./components";
import ToolBarPlugin from "./toolBar";
import { initialConfig } from "./config";
import TreeViewPlugin from "./customPlugins/TreeViewPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import PlaygroundAutoLinkPlugin from "./customPlugins/AutoLinkPlugin";

export function Editor() {
  return (
    <div className="relative mx-auto h-full max-w-[1100px] self-center rounded-xl drop-shadow-lg">
      <LexicalComposer initialConfig={initialConfig}>
        {/* <LexicalEditorTopBar /> */}

        <ToolBarPlugin />

        <Divider />
        <RichTextPlugin
          contentEditable={<CEditable />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />

        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        {/* <TreeViewPlugin /> */}
        <PlaygroundAutoLinkPlugin />
        {/* <ImagesPlugin captionsEnabled={false} /> */}
        {/* <FloatingTextFormatToolbarPlugin /> */}
      </LexicalComposer>
    </div>
  );
}

// function onChange(editorState: any) {
function onChange(editorState: EditorState) {
  // editorState.read(() => {
  //     // Read the contents of the EditorState here.
  //     const root = $getRoot();
  //     const selection = $getSelection();

  //     console.log(root, selection);
  // });

  console.log(editorState.toJSON().root);
}

// function MyOnChangePlugin({ onChange }: { onChange: (editorState: EditorState) => void }) {
//     const [editor] = useLexicalComposerContext();
//     useEffect(() => {
//         return editor.registerUpdateListener(({ editorState }) => {
//             onChange(editorState);
//         });
//     }, [editor, onChange]);

//     return null;
// }
