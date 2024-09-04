import { Document, Model, model, Schema, } from "mongoose";
import { IFileMetadata } from "./file-metadata-model";

type IDownloadLogs = Document & {
    fileId: IFileMetadata["_id"],
    downloadDate: Date,
    downloaderIP: string,
    userAgent: string,
}

const DownloadLogsSchema: Schema<IDownloadLogs> = new Schema({
    fileId: { type: Schema.Types.ObjectId, ref: "FileMetadata", require: true },
    downloadDate: { type: "Date", default: Date.now() },
    downloaderIP: { type: "String", required: true },
    userAgent: { type: "String" }
})

export const DownloadLogsModel: Model<IDownloadLogs> = model<IDownloadLogs>("DownloadLog", DownloadLogsSchema)
