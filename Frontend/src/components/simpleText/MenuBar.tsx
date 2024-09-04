import { NotebookPen, Settings, SquareM } from "lucide-react";
import { useRef, useState } from "react";
import { MenuItem } from "./MenuItems";
import { MutateLoader } from "./MutateLoader";
import gsap from "gsap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleEditorState } from "@/features/note/note-slice";

export default function MenuBar() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isMarkDown = useAppSelector((state) => state.notekṅḥfds.isMarkDown);
  const currentEditorState = useAppSelector(
    (state) => state.notekṅḥfds.currentEditorState,
  );

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
        <MenuItem />
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

        <MenuItem />
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
