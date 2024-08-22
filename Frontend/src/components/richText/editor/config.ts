import { InitialConfigType } from "@lexical/react/LexicalComposer";
import lexicalEditorTheme from "./theme";


import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
// import { ImageNode } from "../components/CustomNodes/ImageNode";

export const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    theme: lexicalEditorTheme,
    onError,
    nodes: [HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
    ]

};

//! ImageNode,
function onError(error: any) {
    console.error(error);
}