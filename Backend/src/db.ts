import mongoose from "mongoose";
async function connectDB() {
    mongoose
        .connect(`${process.env.MONGO_DB_URL}/${process.env.DEV_DATABSE_NAME}`)
        .then(() => {
            console.log("MongoDB connected");
        }).catch((error: Error) => {
            console.log("MongoDB connection  error : ", error.message);
        })
}

export default connectDB
