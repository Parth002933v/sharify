import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
// import cloudinary from "../config/cloudinaryConfig"

const uploadOnCloudinary = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null

        console.log("==============", process.env.CLOUDINARY_CLOUD_NAME, "=========");
        console.log("==============", process.env.CLOUDINARY_API_KEY, "=========");
        console.log("==============", process.env.CLOUDINARY_API_SECRET, "=========");


        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "file",
            resource_type: "raw"
        })

        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log("error in  cloudinary : ", error);

        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }
