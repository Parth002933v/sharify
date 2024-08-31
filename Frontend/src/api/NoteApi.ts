import { NoteMutationType } from "@/pages/SimpleText"
import axios from "axios"

export const postNote = async (data: NoteMutationType) => {

    const result = await axios.post("http://localhost:3000/api/note", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return result.data
}
