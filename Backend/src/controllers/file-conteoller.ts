import { Request } from "express"
import { asyncHandler } from "../utils/async-handler"
import { FileMetadataModel } from "../models/file-metadata-model";
import CustomError from "../utils/error-object";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { SendResponse } from "../utils/ApiResponse";

// import from  "./../../"
//google api
import { google } from 'googleapis';
import path from "path";
import { uploadOnGoogleDrive } from "../utils/GoogleDrive";


const SERVICE_ACCOUNT_FILE = path.join(__dirname, '../../sharify-434617-ef4e64498973.json');

// Authenticate using a service account
const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/drive'],
});

// Initialize the Google Drive API
export const drive = google.drive({ version: 'v3', auth });


const handleFileUpload = asyncHandler(async (req, res) => {

    console.log("handleFileUpload");

    const file = req.file;
    console.log(file);

    if (!file) {
        throw new CustomError({ statusCode: 400, message: 'No file uploaded' });
    }

    console.log(file, "file");



    const result = await uploadOnGoogleDrive(file)

    if (!result) {
        throw new CustomError({ statusCode: 400, message: "file is required" })
    }

    // console.log(result, "result");
    // localhost:3000/api/file/1J90isx6mMYCIdSQJkzrwJtdZgFUqheq7
    const URl = `${req.protocol}://${req.get('host')}/api/file/${result?.data.id}`;

    const fileMetadata = await FileMetadataModel.create({
        fileID: result?.data.id,
        originalName: file.originalname,
        secureUrl: URl,
        size: file.size,
        mimeType: file.mimetype,
    })

    console.log(fileMetadata, "fileMetadata");

    // res.send(SERVICE_ACCOUNT_FILE)
    return SendResponse({ res, statusCode: 200, message: "File uploaded successfully!", data: fileMetadata })

})


const handleFileDownload = asyncHandler(async (req: Request<{ fileId: string }>, res) => {

    const fileId = req.params.fileId

    const fileMetadata = await FileMetadataModel.findOne({ fileID: fileId });

    if (!fileMetadata) {
        throw new CustomError({ message: "File not found", statusCode: 404 })
    }


    // Download the file from Google Drive
    const driveResponse = await drive.files.get(
        { fileId: fileId, alt: 'media' },
        { responseType: 'stream' }
    );

    const encodedName = encodeURIComponent(fileMetadata.originalName);
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedName}`);


    // Pipe the file content to the response
    driveResponse.data
        .on('end', () => {
            console.log('File downloaded successfully');
        })
        .on('error', (error: Error) => {
            console.error('Error downloading file:', error);
            res.status(500).send('Error downloading file');
        })
        .pipe(res);


    // // Redirect to the secure Cloudinary URL or stream the file
    // return res.redirect(fileMetadata.secureUrl);
})

export { handleFileUpload, handleFileDownload }
