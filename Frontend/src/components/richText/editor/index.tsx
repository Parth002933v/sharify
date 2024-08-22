import { $getRoot, $getSelection, EditorState, LexicalEditor } from 'lexical';
import { useEffect } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { CEditable, Divider, Placeholder } from './components';
import lexicalEditorTheme from './theme';
import ToolBarPlugin from './toolBar';
import { initialConfig } from './config';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import TreeViewPlugin from './plugin/TreeViewPlugin';
// import {} from "./plugin/TreeViewPlugin"

// const theme = {
//     // Theme styling goes here
//     //...
// }

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.


export function Editor() {

    // function onChange2(editorState: EditorState) {


    //     console.log("==========",editorState.toJSON(),"=========");


    // }

    return (
        <div className='relative max-w-[1100px]  h-full self-center mx-auto  drop-shadow-lg rounded-xl '>
            <LexicalComposer initialConfig={initialConfig}>
                {/* <LexicalEditorTopBar /> */}
                <ToolBarPlugin />

                <Divider />
                <RichTextPlugin
                    contentEditable={<CEditable />}
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />

                {/* <MyOnChangePlugin onChange={onChange2} /> */}

                <OnChangePlugin onChange={onChange} />
                <HistoryPlugin />
                {/* <TreeViewPlugin /> */}
                <ListPlugin />
                <LinkPlugin />
                {/* <ImagesPlugin captionsEnabled={false} /> */}
                {/* <FloatingTextFormatToolbarPlugin /> */}
            </LexicalComposer>
        </div>
    );
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
// function onChange(editorState: any) {
function onChange(editorState: EditorState) {
    editorState.read(() => {
        // Read the contents of the EditorState here.
        const root = $getRoot();
        const selection = $getSelection();

        console.log(root, selection);
    });
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