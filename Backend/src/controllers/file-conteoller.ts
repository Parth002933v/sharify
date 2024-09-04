import { Request } from "express"
import { asyncHandler } from "../utils/async-handler"
import { FileMetadataModel } from "../models/file-metadata-model";
import CustomError from "../utils/error-object";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { SendResponse } from "../utils/ApiResponse";


const handleFileUpload = asyncHandler(async (req, res) => {

    console.log("handleFileUpload");

    const file = req.file;
    console.log(file);

    if (!file) {
        throw new CustomError({ statusCode: 400, message: 'No file uploaded' });
    }

    console.log(file, "file");

    const result = await uploadOnCloudinary(file.path)

    if (!result) {
        throw new CustomError({ statusCode: 400, message: "file is required" })
    }

    console.log(result, "result");


    const fileMetadata = await FileMetadataModel.create({
        fileID: result.public_id,
        originalName: file.originalname,
        secureUrl: result.secure_url,
        size: file.size,
        mimeType: file.mimetype,
    })

    console.log(fileMetadata, "fileMetadata");



    return SendResponse({ res, statusCode: 200, message: "File uploaded successfully!", data: fileMetadata })

})


const handleFileDownload = asyncHandler(async (req: Request<{ fileId: string }>, res) => {

    const fileId = req.params.fileId

    const fileMetadata = await FileMetadataModel.findOne({ publicId: fileId });

    if (!fileMetadata) {
        throw new CustomError({ message: "File not found", statusCode: 404 })
    }

    // Redirect to the secure Cloudinary URL or stream the file
    return res.redirect(fileMetadata.secureUrl);
})

export { handleFileUpload, handleFileDownload }
