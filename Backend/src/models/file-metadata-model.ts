import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./user-model";

export interface IFileMetadata extends Document {
    fileID: string
    originalName: string
    secureUrl: string
    size: number, // in bytes
    mimeType: string,
    uploadDate: Date,
    expiresAt: Date,
    downloadCount: number,
    password: string,
    ownerId: IUser["_id"],
}

const FileMetadataShema: Schema<IFileMetadata> = new Schema({
    fileID: { type: String, required: true, unique: true },
    originalName: { type: String, required: true },
    secureUrl: { type: String, required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now() },
    expiresAt: { type: Date, default: () => Date.now() + 30 * 24 * 60 * 60 * 1000 }, // 30days
    downloadCount: { type: Number, default: 0 },
    password: { type: String, required: false },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", require: false }
})

export const FileMetadataModel: Model<IFileMetadata> = model<IFileMetadata>("FileMetadata", FileMetadataShema)
