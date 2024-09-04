import connectDB from "./db"
import app from "./server"
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 3000;

// import "./config/cloudinaryConfig"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


(async () => {
    await connectDB()

    const server = app.listen(PORT, () => {
        console.log("app is listening on port 3000");
        console.log(`http://localhost:${PORT}/`);
    })

    process.on("uncaughtException", (err: Error) => {
        console.log(err.message);
        console.log("Unhandled exception occurred! Shutting down...");
        server.close(() => { process.exit(1) })
    })
})().catch((error: Error) => {
    console.error('Error starting the application:', error);
    process.exit(1);
})
