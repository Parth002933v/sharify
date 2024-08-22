import { Dispatch, SetStateAction } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { AlertDialogAction, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import { Lock } from "lucide-react";

export function Dialoag({ text, messageDialog, setMessageDialog }: { text: string, messageDialog: boolean, setMessageDialog: Dispatch<SetStateAction<boolean>> }) {


    return <AlertDialog open={messageDialog} onOpenChange={(isOpen) => { setMessageDialog(isOpen) }} >

        <AlertDialogTrigger asChild>
            <Button className="self-end my-1" variant={"outline"}>
                {text}
    
            </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>

            <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-semibold">Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>


            <AlertDialogDescription>
                <p className="mb-4">
                    Make sure to remember the password. We don't store passwords, just the encrypted data. (If the password is forgotten, the data can't be accessed.)
                    Longer passwords are more secure.
                </p>
                <div className="mb-4">
                    <label className="block mb-1">Enter Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded"
                    // value={confirmPassword}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

            </AlertDialogDescription>

            <AlertDialogFooter>
                <AlertDialogAction >

                    <Button
                        variant={"default"}
                        className="px-4 "
                    >
                        Save
                    </Button>

                </AlertDialogAction>

                <AlertDialogAction onClick={() => setMessageDialog(false)}>

                    <Button
                        variant={"outline"}
                        className="px-4"
                    >
                        Cancel
                    </Button>

                </AlertDialogAction>

            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>


}