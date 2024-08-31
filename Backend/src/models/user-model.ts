import { Document, model, Schema } from "mongoose";

export type IUser = Document & {
    username: string;
    email: string
    passowrd: string
}

const UserSchema = new Schema<IUser>({
    username: {
        required: [true, "username is required"]
    },
    email: {
        required: [true, "username is email"]
    },
    passowrd: {
        required: [true, "username is passowrd"]
    },
})

const UserModel = model<IUser>("User", UserSchema);
export default UserModel
