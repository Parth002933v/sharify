import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  RangeSelection,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import {
  $isAtNodeEnd,
  $isParentElementRTL,
  $setBlocksType,
  $wrapNodes,
} from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { EventType, eventTypes } from "./toolbarIconsList";
import useModal from "@/common/hooks/useModal";
// import { ImagePayload } from "../customNodes/imageNode";
// import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
// import useModal from "../../common/hooks/useModal";

const LowPriority = 1;
const useOnClickListener = () => {
  const [editor] = useLexicalComposerContext();
  const [modal, showModal] = useModal();
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null,
  );
  const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    let allSelectedEvents = [...selectedEventTypes];

    // inner function

    const pushInEventTypesState = (selectionFormat: boolean, event: string) => {
      if (selectionFormat) {
        if (selectedEventTypes.includes(event)) return;
        else allSelectedEvents.push(event);
      } else {
        allSelectedEvents = allSelectedEvents.filter((ev) => ev !== event);
      }
    };

    // range selection ( e.g like to bold only the particular area of the text)
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          setBlockType(type);
        }
      }

      pushInEventTypesState(selection.hasFormat("bold"), eventTypes.formatBold);
      pushInEventTypesState(
        selection.hasFormat("italic"),
        eventTypes.formatItalic,
      );
      pushInEventTypesState(
        selection.hasFormat("underline"),
        eventTypes.formatUnderline,
      );
      pushInEventTypesState(
        selection.hasFormat("strikethrough"),
        eventTypes.formatStrike,
      );
      pushInEventTypesState(selection.hasFormat("code"), eventTypes.formatCode);

      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        if (!allSelectedEvents.includes(eventTypes.formatInsertLink))
          allSelectedEvents.push(eventTypes.formatInsertLink);
        setIsLink(true);
      } else {
        if (allSelectedEvents.includes(eventTypes.formatInsertLink)) {
          allSelectedEvents = allSelectedEvents.filter(
            (ev) => ev !== eventTypes.formatCode,
          );
        }
        setIsLink(false);
      }

      setSelectedEventTypes(allSelectedEvents);
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);

  const onClick = (eventType: EventType) => {
    switch (eventType) {
      case "formatBold":
        return editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      case "formatItalic":
        return editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      case "formatUnderline":
        return editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
      case "formatStrike":
        return editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
      case "formatUndo":
        return editor.dispatchCommand(UNDO_COMMAND, undefined);
      case "formatRedo":
        return editor.dispatchCommand(REDO_COMMAND, undefined);
      case "formatAlignLeft":
        return editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
      case "formatAlignRight":
        return editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
      case "formatAlignCenter":
        return editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
      case "paragraph":
        return formatParagraph();
      case "h1":
        return fomateHeading("h1");
      case "h2":
        return fomateHeading("h2");
      case "ol":
        return formatList("ol");
      case "ul":
        return formatList("ul");
      case "quote":
        return formatQuote();
      case "formatCode":
        return formatCode();
      case "formatInsertLink":
        return insertLink();
      case "insertImage": {
        // showModal: JSX.Element | ((title: any, getContent: any, closeOnClickOutside?: boolean) => void) | null
        // showModal: JSX.Element | ((title: string, getContent: any, closeOnClickOutside?: boolean) => void) | null

        // return showModal("insertImage", (close) => <div></div>);
        const payload = {
          src: "https://playground.lexical.dev/assets/yellow-flower-vav9Hsve.jpg",
          altText: "sample image",
        };

        // return editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
      }
      default:
        return;
    }
  };

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const fomateHeading = (eventType: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(eventType));
      }
    });
  };

  function formatList(tag: "ol" | "ul"): void {
    if (tag == "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }

    //     editor.update(() => {
    //       if (tag === "ol") {
    //         const selection = $getSelection();
    //         if ($isRangeSelection(selection)) {
    //           editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    //         }
    //         //   editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    //         return;
    //       } else {
    //         const selection = $getSelection();
    //         if ($isRangeSelection(selection)) {
    //           editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    //         }
    //       }
    //     }

    // );
    // editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
    }
  };

  return {
    modal,
    onClick,
    selectedEventTypes,
    blockType,
    isLink,
    editor,
  };
};

function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

export default useOnClickListener;
