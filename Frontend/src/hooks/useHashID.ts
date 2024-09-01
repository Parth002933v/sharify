import { useCheckNoteExistQuery } from "@/features/note/notesAPI";
import { generateRandomHash } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


/**
 * The useHashID hook manages the generation and handling of a unique hash ID in a React application.
 * It ensures that a random hash is generated and set if the current URL doesn't have one.
 * Additionally, it checks whether a note associated with the hash exists and updates the URL with the new hash if needed.
 * This hook simplifies the process of managing hash-based routing and ensures that each session or item has a unique identifier.
 *
 * @returns {Object} An object containing:
 * - generateAndSetHash: Function to generate a new random hash and set it as the current hash ID.
 * - hashID: The current hash ID, or null if not yet generated.
 */
export function useHashID() {
    const [hashID, setHashID] = useState<string | null>(null);
    const navigate = useNavigate();

    const { data, error, isFetching } = useCheckNoteExistQuery(hashID!, {
        skip: !hashID,
    });

    const generateAndSetHash = () => {
        const newHash = generateRandomHash();
        setHashID(newHash);
    };

    useEffect(() => {
        if (hashID && !isFetching) {
            if (data?.statusCode === 200) {
                generateAndSetHash();
            } else {
                navigate({ hash: hashID });
            }
        }
    }, [data, error, hashID, isFetching, navigate]);

    return { generateAndSetHash, hashID };
}
