import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./user-model";

export interface IFileMetadata extends Document {
  fileID: string;
  originalName: string;
  secureUrl: string;
  size: number; // in bytes
  mimeType: string;
  downloadCount: number;
  password: string;
  ownerId: IUser["_id"];
}

const FileMetadataShema: Schema<IFileMetadata> = new Schema(
  {
    fileID: { type: String, required: true, unique: true },
    originalName: { type: String, required: true },
    secureUrl: { type: String, required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
    downloadCount: { type: Number, default: 0 },
    password: { type: String, required: false },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", require: false },
  },
  { timestamps: true },
);

export const FileMetadataModel: Model<IFileMetadata> = model<IFileMetadata>(
  "FileMetadata",
  FileMetadataShema,
);
