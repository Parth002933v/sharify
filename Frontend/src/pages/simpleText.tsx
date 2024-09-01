// React Imports
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Third-Party Library Imports
import debounce from "lodash.debounce";

// Internal Imports
import { Textarea } from "../components/ui/textarea";
import { ProtectTextButtonDialog } from "../components/simpleText/protectTextButtonDialog";
import { NoteMutationType } from "@/api/NoteApi";
import { LoaderContext } from "../context/loadingContext";
import MenuBar from "@/components/simpleText/MenuBar";
import {
  useFetchNoteQuery,
  useCreateNoteMutation,
} from "@/features/note/notesAPI";
import { useToast } from "@/hooks/use-toast";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/utils/helper";
import { ErrorResponse } from "@/types/error-res.type";
// import { toast, ToastContainer } from "react-toastify";

const validatePassword = (password: string): boolean => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[@#$%]/.test(password);
  const isLongEnough = password.length > 6;
  return hasUppercase && hasLowercase && hasSpecialChar && isLongEnough;
};

export default function SimpleText() {
  const location = useLocation();

  // shadcn toast hook
  const { toast } = useToast();

  const [messageDialog, setMessageDialog] = useState(false);
  const [text, setText] = useState("");
  const [isProtected, setIsProtected] = useState(false);

  // RTK Query hooks
  const [addNote, { isLoading, error }] = useCreateNoteMutation();
  const { data: note } = useFetchNoteQuery(location.hash.replace("#", ""));

  // get we get the data from api then we will add it in textarea
  useEffect(() => {
    (() => {
      note && setText(note.data.content);
    })();
  }, [note]);

  //   useEffect(() => {
  //     if (error instanceof FetchBaseQueryError) {
  //     }
  //     // toast.error(error);
  //   }, [error]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  //   const mutation: UseMutationResult<void, ErrorResponse, NoteMutationType> =
  //     useMutation({
  //       mutationFn: postNote,
  //       onSuccess: () => {
  //         console.log("Note created");
  //       },
  //       onError: (err) => {
  //         console.error("Error in note creation: ", err);
  //       },
  //     });

  const debouncedMutate = useCallback(
    debounce(async (value: NoteMutationType) => {
      await addNote(value)
        .unwrap()
        .catch((err) => {
          if (isFetchBaseQueryError(err)) {
            const errMsg =
              "error" in err ? err.error : JSON.stringify(err.data);
            toast({ description: errMsg, variant: "destructive" });
          } else if (isErrorWithMessage(err)) {
            toast({ description: err.message, variant: "destructive" });
          }

          //   toast({
          //     description: err.message,
          //   });
        });
    }, 2000),
    [addNote],
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
    <div className="relative min-h-[calc(100vh-8rem)] bg-secondary max-lg:px-5">
      {/* Menus and Loaders */}

      <LoaderContext.Provider value={isLoading}>
        <MenuBar />
      </LoaderContext.Provider>

      {/* Protect Text Button */}
      <div className="mx-[calc(100vw-13rem)] flex flex-col">
        <ProtectTextButtonDialog
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

      <div>{/* <ToastContainer /> */}</div>
    </div>
  );
}
