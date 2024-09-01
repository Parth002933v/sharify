import { Settings } from "lucide-react";
import { useRef, useState } from "react";
import { MenuItem } from "./MenuItems";
import { MutateLoader } from "./MutateLoader";
import gsap from "gsap";

export default function MenuBar() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
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
          onClick={handleClick}
          color="white"
          size={40}
          className="cursor-pointer rounded-full bg-slate-800 p-2 hover:bg-slate-700"
        />
      </div>
    </div>
  );
}
