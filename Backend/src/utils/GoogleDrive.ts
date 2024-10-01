import fs from "fs";
import { drive } from "../controllers/file-controller";

const uploadOnGoogleDrive = async (file: Express.Multer.File) => {
  try {
    if (!file.path) return null;

    const response = await drive.files.create({
      requestBody: { name: file.originalname },
      media: {
        body: fs.createReadStream(file?.path || ""),
        mimeType: file?.mimetype || undefined,
      },
      fields: "id",
    });

    fs.unlinkSync(file?.path || "");
    return response;
  } catch (error) {
    console.log("error in  google drive : ", error);

    fs.unlinkSync(file?.path || "");
    return null;
  }
};

export { uploadOnGoogleDrive };
