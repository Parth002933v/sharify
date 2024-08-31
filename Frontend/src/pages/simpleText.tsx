import { useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "../components/ui/textarea";
import { Dialoag } from "../components/simpleText/protectText";
import { Earth, Settings } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { postNote } from "@/api/NoteApi";

const validatePassword = (password: string): boolean => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[@#$%]/.test(password);
  const isLongEnough = password.length > 6;
  return hasUppercase && hasLowercase && hasSpecialChar && isLongEnough;
};

export type NoteMutationType = {
  hashID: string;
  content: string;
  noteType: "lexical" | "markdown";
  owner?: string;
  isProtected: boolean;
};

export default function SimpleText() {
  const location = useLocation();
  const [messageDialog, setMessageDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const mutation: UseMutationResult<void, Error, NoteMutationType> =
    useMutation({
      mutationFn: postNote,
      onSuccess: () => {
        console.log("Note created");
      },
      onError: (err) => {
        console.error("Error in note creation: ", err);
      },
    });

  const debouncedMutate = useCallback(
    debounce((value: NoteMutationType) => {
      mutation.mutateAsync(value);
    }, 2000),
    [mutation],
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const mutationData: NoteMutationType = {
      content: e.target.value,
      hashID: location.hash.replace("#", ""),
      isProtected: isProtected,
      noteType: "markdown",
    };

    debouncedMutate(mutationData);
  };

  const handleClick = () => {
    if (isVisible) {
      gsap.to(boxRef.current, { x: "-100%", duration: 1, ease: "power2.out" });
    } else {
      gsap.to(boxRef.current, { x: "0%", duration: 1, ease: "power2.out" });
    }
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    return () => {
      debouncedMutate.cancel();
    };
  }, [debouncedMutate]);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-secondary max-lg:px-5">
      {/* Menus & Loader */}
      <div className="fixed bottom-0 left-0 top-20 z-10 flex h-[calc(100vh-7rem)] w-44 flex-col justify-between pb-10">
        {/* Loader */}
        <div>
          <svg
            fill="currentColor"
            className="h-10 w-10 animate-spin"
            viewBox="0 0 16 16"
          >
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path
              fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>
        </div>

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

      {/* Protect Text Button */}
      <div className="mx-[calc(100vw-13rem)] flex flex-col">
        <Dialoag
          text={`${isProtected ? "Unprotect Text" : "Protect Text"}`}
          messageDialog={messageDialog}
          setMessageDialog={setMessageDialog}
        />
      </div>

      {/* Text Area */}
      <div className="pb-3">
        <Textarea
          ref={textareaRef}
          className="text-md inset-0 mx-auto min-h-[900px] max-w-[1100px] resize-none overflow-hidden bg-white drop-shadow-lg"
          value={text}
          placeholder="Enter Your text here..."
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="my-2 flex h-12 w-full items-center justify-center rounded-md border bg-white px-3">
      <Earth />
      <p className="text-center text-sm">Publish As Web Page</p>
    </div>
  );
}
