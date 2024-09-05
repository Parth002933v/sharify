import { Earth, Globe, NotebookPen, Settings, SquareM } from "lucide-react";
import { useRef, useState } from "react";
import { MenuItem } from "./MenuItems";
import { MutateLoader } from "./MutateLoader";
import gsap from "gsap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPublishedURL, toggleEditorState } from "@/features/note/note-slice";
import { usePublishNoteMutation } from "@/features/note/notesAPI";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { toast } = useToast();

  const isMarkDown = useAppSelector((state) => state.simpleNote.isMarkDown);
  const currentEditorState = useAppSelector(
    (state) => state.simpleNote.currentEditorState,
  );
  //   const isPublished = useAppSelector((state) => state.simpleNote.isPublished!);
  const hashID = useAppSelector((state) => state.simpleNote.hashID!);
  const noteType = useAppSelector((state) => state.simpleNote.noteType!);
  const publishedURL = useAppSelector((state) => state.simpleNote.publishedURL);

  const navigate = useNavigate();

  const [publishNoteMutation, { isLoading }] = usePublishNoteMutation();

  const dispatch = useAppDispatch();

  const handleMenuClick = () => {
    if (isVisible) {
      gsap.to(boxRef.current, { x: "-100%", duration: 1, ease: "power2.out" });
    } else {
      gsap.to(boxRef.current, { x: "0%", duration: 1, ease: "power2.out" });
    }
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed bottom-0 left-0 top-20 z-10 flex h-[calc(100vh-7rem)] w-44 flex-col justify-between pb-10">
      {/* Loader */}
      <MutateLoader />

      <div ref={boxRef} className="-translate-x-[100%]">
        {isMarkDown ? (
          <MenuItem
            text={`${currentEditorState == "editor" ? "View as markdown" : "back to editor"}`}
            Icon={currentEditorState == "editor" ? SquareM : NotebookPen}
            onClick={() => {
              dispatch(toggleEditorState());
            }}
          />
        ) : (
          <></>
        )}

        <MenuItem
          text={
            isLoading == true
              ? "Publishing..."
              : publishedURL
                ? "Published Page ✅"
                : "Publish as webPage"
          }
          Icon={publishedURL ? Globe : Earth}
          onClick={async () => {
            if (publishedURL) {
              if (isLoading == false) {
                await publishNoteMutation({
                  hashID: hashID,
                  noteType: noteType,
                })
                  .unwrap()
                  .then((v) => {
                    dispatch(setPublishedURL(v.data.publishedURL));
                  })
                  .catch((e) => {
                    toast({ description: e, variant: "destructive" });
                  });
              }
            } else {
              console.log(publishedURL);
              navigate(publishedURL!);
            }
          }}
        />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>

      {/* Settings */}
      <div className="pl-5">
        <Settings
          onClick={handleMenuClick}
          color="white"
          size={40}
          className="cursor-pointer rounded-full bg-slate-800 p-2 hover:bg-slate-700"
        />
      </div>
    </div>
  );
}
