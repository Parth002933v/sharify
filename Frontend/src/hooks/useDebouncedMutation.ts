import { useCallback } from "react";
import debounce from "lodash.debounce";
import { TNote, useCreateNoteMutation } from "@/features/note/notesAPI";
import { useToast } from "@/hooks/use-toast";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/utils/helper";

export function useDebouncedMutation() {
    const { toast } = useToast();
    const [addNote] = useCreateNoteMutation();

    const debouncedMutate = useCallback(
        debounce(async (value: TNote) => {
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
                });
        }, 1500),
        [addNote, toast]
    )

    return { debouncedMutate };
};
