import { model, Schema } from "mongoose";

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.USER
    }


}, { timestamps: true, versionKey: false })


const UserModel = model('User', userSchema)


export default UserModel