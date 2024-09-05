import { Dispatch, SetStateAction, useRef } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import { Lock } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setEncripterd } from "@/features/note/note-slice";

export function ProtectTextButtonDialog({
  text,
  messageDialog,
  setMessageDialog,
}: {
  text: string;
  messageDialog: boolean;
  setMessageDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  const passwordred = useRef<HTMLInputElement>(null);
  const conPasswordred = useRef<HTMLInputElement>(null);
  const handleSave = () => {
    if (
      passwordred.current &&
      conPasswordred.current &&
      passwordred.current?.value == conPasswordred.current?.value
    ) {
      dispatch(setEncripterd(passwordred.current.value));
    }
  };

  return (
    <AlertDialog
      open={messageDialog}
      onOpenChange={(isOpen) => {
        setMessageDialog(isOpen);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button className="my-1 self-end" variant={"outline"}>
          {text}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Are you absolutely sure?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          <p className="mb-4 text-red-800">
            Make sure to remember the password. We don't store passwords, just
            the encrypted data. (If the password is forgotten, the data can't be
            accessed.) Longer passwords are more secure.
          </p>
          <div className="mb-4">
            <label className="mb-1 block">Enter Password</label>
            <input
              type="password"
              ref={passwordred}
              className="w-full rounded border border-gray-300 p-2"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block">Confirm Password</label>
            <input
              type="password"
              ref={conPasswordred}
              className="w-full rounded border border-gray-300 p-2"
              // value={confirmPassword}
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button variant={"default"} className="px-4" onClick={handleSave}>
              Save
            </Button>
          </AlertDialogAction>

          <AlertDialogAction onClick={() => setMessageDialog(false)}>
            <Button variant={"outline"} className="px-4">
              Cancel
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
