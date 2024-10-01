import { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../ui/alert-dialog";
import {
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setEncryptedPassword,
  setIsProtected,
  setText,
} from "@/features/note/note-slice";
import { Input } from "@/components/ui/input.tsx";
import { decrypt } from "@/lib/encryptionAndDecyption.ts";

type ProtectTextButtonDialogProps = {
  messageDialog: boolean;
  setMessageDialog: Dispatch<SetStateAction<boolean>>;
  isAskPassword: boolean;
};

export function ProtectTextButtonDialog({
  setMessageDialog,
  messageDialog,
  isAskPassword = false,
}: ProtectTextButtonDialogProps) {
  const dispatch = useAppDispatch();
  const encryptedPassword = useAppSelector(
    (state) => state.simpleNote.encrypted,
  );
  const content = useAppSelector((state) => state.simpleNote.content);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSavePasswordToState = async () => {
    setError(null);
    if (!isAskPassword) {
      // password should be provided and should be same
      if (
        password.trim() &&
        confirmPassword.trim() &&
        password === confirmPassword
      ) {
        dispatch(setEncryptedPassword(password));
        setMessageDialog(false);
      } else {
        setError("Password should be required and same ");
      }
    } else {
      if (password.trim() && content) {
        const decryptedContent = await decrypt(content, password);
        if (decryptedContent == null) {
          console.log("Password is Incorrect");
          setError("Password is Incorrect");
        } else {
          dispatch(setText(decryptedContent));
          dispatch(setEncryptedPassword(password));
          dispatch(setIsProtected(false));
          setMessageDialog(false);
        }
      } else {
        setError("Password should be required and same ");
      }
    }
  };

  return (
    <>
      {encryptedPassword ? (
        <Button
          className={"pointer-events-none mt-1 flex self-end text-green-600"}
        >
          Encrypted <span> 🔐</span>
        </Button>
      ) : (
        <AlertDialog
          open={messageDialog}
          onOpenChange={(isOpen) => {
            setMessageDialog(isOpen);
          }}
        >
          <AlertDialogTrigger asChild>
            <Button className="my-1 self-end" variant={"outline"}>
              {isAskPassword ? <>Unlock Note</> : <>Protect Text</>}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            {isAskPassword ? (
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Enter Password to Unlock Note
                </AlertDialogTitle>
              </AlertDialogHeader>
            ) : (
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-semibold">
                  Are you absolutely sure?
                </AlertDialogTitle>

                <AlertDialogDescription className="mb-4 text-red-800">
                  Make sure to remember the password. We don't store passwords,
                  just the encrypted data. (If the password is forgotten, the
                  data can't be accessed.) Longer passwords are more secure.
                </AlertDialogDescription>
              </AlertDialogHeader>
            )}

            <AlertDialogDescription>
              <div className="mb-4">
                <label className="mb-1 block">Enter Password</label>
                <Input
                  type="password"
                  className="w-full rounded border border-gray-300 p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isAskPassword ? (
                <>
                  <div className={"text-destructive"}>{error}</div>
                </>
              ) : (
                <div className="mb-4">
                  <label className="mb-1 block">Confirm Password</label>
                  <Input
                    type="password"
                    className="w-full rounded border border-gray-300 p-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className={"text-destructive"}>{error}</div>
                </div>
              )}
            </AlertDialogDescription>

            <AlertDialogFooter>
              {/*<AlertDialogAction  className={"px-4"}>*/}
              <Button
                variant={"default"}
                className="px-4"
                onClick={handleSavePasswordToState}
              >
                {isAskPassword ? <>Unlock</> : <>Save</>}
              </Button>

              {/*close the dialog*/}
              {isAskPassword ? (
                <></>
              ) : (
                <Button
                  variant={"outline"}
                  onClick={() => setMessageDialog(false)}
                  className="px-4"
                >
                  Cancel
                </Button>
              )}
              {/*</AlertDialogAction>*/}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
