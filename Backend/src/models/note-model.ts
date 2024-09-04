import { Document, model, Schema } from "mongoose";
import { IUser } from "./user-model";

type INote = Document & {
    hashID: string,
    content: string,
    noteType: "lexical" | "markdown"
    owner: IUser["_id"],
    isProtected: boolean,
}

const NoteSchema = new Schema<INote>({
    hashID: {
        type: "String",
        unique: true,
        required: [true, "slugUrl must be provided"]
    },
    content: {
        type: "String",
        required: [true, "content must be provided"]
    },
    noteType: {
        type: "String",
        default: "markdown",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    isProtected: {
        type: "Boolean",
        required: false,
        default: false,
    }
}, {
    timestamps: true,
    strict: true
}
)

const NoteModel = model<INote>("Note", NoteSchema)
export default NoteModel
