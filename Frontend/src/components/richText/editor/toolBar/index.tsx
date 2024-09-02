import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { EventType, pluginsList } from "./toolbarIconsList";
import useOnClickListner from "./useOnClickListner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "@gsap/react";
import {
  $getSelection,
  $isRangeSelection,
  BaseSelection,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { getSelectedNode } from "@/lib/getSelectNode";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { mergeRegister } from "@lexical/utils";

const LowPriority = 1;

export default function ToolBar() {
  const { onClick, blockType, editor, isLink, selectedEventTypes } =
    useOnClickListner();

  const isIconSelected = (plugin: any) =>
    selectedEventTypes.includes(plugin.event) ||
    blockType.includes(plugin.event);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="sticky top-0 z-20 flex flex-wrap gap-3 rounded-tl-md rounded-tr-md border-b bg-white p-1"
    >
      {/* list of map */}
      {pluginsList.map((plugin) => (
        <TooltipProvider key={plugin.id}>
          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              {/* main component */}

              {plugin.event == "insertImage" ? (
                <ImageOptionDropdown
                  activeEditor={editor}
                  onSelect={(eventType) => {
                    onClick(eventType);
                  }}
                />
              ) : (
                <div
                  key={plugin.id}
                  className={`${isIconSelected(plugin) ? "bg-[#eee] text-black" : "text-gray-600"} cursor-pointer rounded-lg p-2 hover:bg-[#eee]`}
                  onClick={() => onClick(plugin.event)}
                >
                  <plugin.Icon />
                </div>
              )}
            </TooltipTrigger>

            <TooltipContent>{plugin.event}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      {isLink &&
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
    </div>
  );
}

function positionEditorElement(editor: HTMLDivElement, rect: DOMRect | null) {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
}

function FloatingLinkEditor({ editor }: { editor: any }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(
    null,
  );

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection!.isCollapsed && //! may be null
      rootElement !== null &&
      rootElement.contains(nativeSelection!.anchorNode) //! may be null
    ) {
      const domRange = nativeSelection!.getRangeAt(0); //! may be null
      let rect: DOMRect;
      if (nativeSelection!.anchorNode === rootElement) {
        //! may be null
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }: { editorState: any }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority,
      ),
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div
      ref={editorRef}
      className="absolute left-[-10000px] top-[-10000px] z-[100] mt-[-6px] w-full max-w-[300px] rounded-lg bg-white opacity-0 shadow-[0px_5px_10px_rgba(0,0,0,0.3)] transition-opacity duration-500"
    >
      {isEditMode ? (
        <input
          ref={inputRef}
          className="font-inherit relative m-2 box-border block w-[calc(100%-24px)] rounded-[15px] border-0 bg-[#eee] p-2 text-[15px] text-[#050505] outline-0"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="font-inherit relative m-2 box-border block w-[calc(100%-24px)] rounded-[15px] border-0 bg-[#eee] p-2 text-[15px] text-[#050505] outline-0">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="absolute bottom-0 right-0 top-0 w-[35px] cursor-pointer bg-[url('/images/icons/pencil-fill.svg')] bg-center bg-no-repeat align-baseline"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileImage, SquareX } from "lucide-react";
function ImageOptionDropdown({
  onSelect,
  activeEditor,
}: {
  activeEditor: LexicalEditor;
  onSelect: (eventType: EventType) => void;
}) {
  //   const [editor] = useLexicalComposerContext();

  const [isOpen, setOpen] = useState(false);
  const [isDialogOpne, setDialogOpne] = useState(false);

  const handleInsertImageDialogCancal = () => setDialogOpne(false);
  return (
    <>
      <DropdownMenu
        open={isOpen}
        onOpenChange={(e) => {
          setOpen(e);
        }}
      >
        <DropdownMenuTrigger asChild className="flex">
          <Button className="gap-3 bg-white text-gray-600 shadow-none hover:bg-[#eee]">
            Insert Image
            <ChevronDown
              size={20}
              className={`${isOpen ? "rotate-180" : "rotate-0"} transition`}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="text-gray-600">
          <DropdownMenuItem
            onClick={() => setDialogOpne(true)}
            className="gap-3 hover:cursor-pointer"
          >
            <FileImage size={20} color="#4b5563" /> Image
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-3 hover:cursor-pointer">
            <FileImage size={20} color="#4b5563" />
            Inline Image
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <InsertImageDialog
        activeEditor={activeEditor}
        onSelect={(eventType: EventType) => {
          onSelect(eventType);
        }}
        isDialogOpne={isDialogOpne}
        handleInsertImageDialogCancal={handleInsertImageDialogCancal}
      />
    </>
  );
}

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import yellowFlowerImage from "./../../../../../public/images/yellow-flower.jpg";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_IMAGE_COMMAND,
  InsertImagePayload,
} from "../customPlugins/ImagePlugin";

function InsertImageDialog({
  isDialogOpne,
  activeEditor,
  handleInsertImageDialogCancal,
  onSelect,
}: {
  activeEditor: LexicalEditor;
  onSelect: (eventType: EventType) => void;
  isDialogOpne: boolean;
  handleInsertImageDialogCancal: () => void;
}) {
  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };
  return (
    <AlertDialog open={isDialogOpne}>
      <AlertDialogContent className="w-1/4">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between text-2xl font-bold text-[#4b5563]">
            Insert Image
            <Button
              onClick={() => handleInsertImageDialogCancal()}
              className="h-min w-min p-0"
              variant={"ghost"}
            >
              <SquareX className="hover:cursor-pointer" color="#4b5563" />
            </Button>
          </AlertDialogTitle>

          <div className="h-[1px] bg-[#4b5563]" />

          <AlertDialogDescription className="flex flex-col gap-5 py-7">
            <Button
              onClick={() =>
                onClick({
                  src: yellowFlowerImage,
                  altText: "Yellow flower in tilt shift lens",
                })
              }
              className="bg-black/10 text-black hover:bg-black/20"
            >
              Sample
            </Button>
            <Button className="bg-black/10 text-black hover:bg-black/20">
              URL
            </Button>
            <Button className="bg-black/10 text-black hover:bg-black/20">
              File
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
