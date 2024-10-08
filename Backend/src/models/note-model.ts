import { Document, model, Schema } from "mongoose";
import { IUser } from "./user-model";

type INote = Document & {
    hashID: string,
    content: string,
    noteType: "lexical" | "markdown"
    // isPublished: boolean,
    publishedUrl: string
    owner: IUser["_id"],
    isProtected: boolean,
}

const NoteSchema = new Schema<INote>({
    hashID: { type: String, unique: true, required: [true, "slugUrl must be provided"] },
    content: { type: String, required: [true, "content must be provided"] },
    noteType: { type: String, default: "markdown", },
    // isPublished: { type: Boolean, default: false },
    publishedUrl: { type: String, required: false },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: false },
    isProtected: { type: Boolean, required: false, default: false, }
}, {
    timestamps: true,
    strict: true
}
)

const NoteModel = model<INote>("Note", NoteSchema)
export default NoteModel
