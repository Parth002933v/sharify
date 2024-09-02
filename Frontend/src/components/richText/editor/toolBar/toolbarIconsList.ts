import {
    Type,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Code,
    Undo,
    Redo,
    Bold,
    Italic,
    Underline,
    Image,
    Link2,
    AlignLeft,
    AlignRight,
    AlignJustify,
    LucideProps,
} from "lucide-react";
import React from "react";

export const eventTypes = {
    paragraph: "paragraph",
    h1: "h1",
    h2: "h2",
    ul: "ul",
    ol: "ol",
    quote: "quote",
    formatCode: "formatCode",
    formatUndo: "formatUndo",
    formatRedo: "formatRedo",
    formatBold: "formatBold",
    formatItalic: "formatItalic",
    formatUnderline: "formatUnderline",
    formatStrike: "formatStrike",
    formatInsertLink: "formatInsertLink",
    formatAlignLeft: "formatAlignLeft",
    formatAlignCenter: "formatAlignCenter",
    formatAlignRight: "formatAlignRight",
    insertImage: "insertImage",
    insertInlineImage: "insertInlineImage",
} as const;

export type EventType = keyof typeof eventTypes;

type TPluginsList = {
    id: number;
    Icon: React.ComponentType<LucideProps>;
    event: EventType;
};
export const pluginsList: TPluginsList[] = [
    {
        id: 1,
        Icon: Type,
        event: eventTypes.paragraph,
    },
    {
        id: 2,
        Icon: Heading1,
        event: eventTypes.h1,
    },
    {
        id: 3,
        Icon: Heading2,
        event: eventTypes.h2,
    },
    {
        id: 4,
        Icon: List,
        event: eventTypes.ul,
    },

    {
        id: 5,
        Icon: ListOrdered,
        event: eventTypes.ol,
    },
    {
        id: 6,
        Icon: Quote,
        event: eventTypes.quote,
    },

    {
        id: 7,
        Icon: Code,
        event: eventTypes.formatCode,
    },
    {
        id: 8,
        Icon: Undo,
        event: eventTypes.formatUndo,
    },
    {
        id: 9,
        Icon: Redo,
        event: eventTypes.formatRedo,
    },
    {
        id: 10,
        Icon: Bold,
        event: eventTypes.formatBold,
    },
    {
        id: 11,
        Icon: Italic,
        event: eventTypes.formatItalic,
    },
    {
        id: 12,
        Icon: Underline,
        event: eventTypes.formatUnderline,
    },
    // { // reactive it if you need it
    //   id: 13,
    //   Icon: StrikethroughSOutlinedIcon,
    //   event: eventTypes.formatStrike,
    // },
    {
        id: 13,
        Icon: Image,
        event: eventTypes.insertImage,
    },
    {
        id: 14,
        Icon: Link2,
        event: eventTypes.formatInsertLink,
    },
    {
        id: 15,
        Icon: AlignLeft,
        event: eventTypes.formatAlignLeft,
    },

    {
        id: 16,
        Icon: AlignJustify,
        event: eventTypes.formatAlignCenter,
    },
    {
        id: 17,
        Icon: AlignRight,
        event: eventTypes.formatAlignRight,
    },
    {
        id: 18,
        Icon: Image,
        event: eventTypes.insertInlineImage,
    },
];
