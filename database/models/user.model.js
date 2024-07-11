import { model, Schema } from "mongoose";
import { roles, status } from "../../src/utils/enum.js";

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

    confirmEmail: {
        type: Boolean,
        default: false
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.USER
    },

    status: {
        type: String,
        enum: Object.values(status),
        default: status.OFFLINE

    }


}, { timestamps: true, versionKey: false })


const UserModel = model('User', userSchema)


export default UserModel