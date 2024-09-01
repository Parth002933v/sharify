import axios from "axios"

export type NoteMutationType = {
    hashID: string;
    content: string;
    noteType: "lexical" | "markdown";
    owner?: string;
    isProtected: boolean;
};




export const postNote = async (data: NoteMutationType) => {

    const result = await axios.post("http://localhost:3000/api/note", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return result.data
}
