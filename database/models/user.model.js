import bcrypt from 'bcrypt';
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

    },
    passwordChangedAt: Date


}, { timestamps: true, versionKey: false })

/* ============= Hash Password ============= */

userSchema.pre('save', function () {

    this.password = bcrypt.hashSync(this.password, 10)

}),

    userSchema.pre('findOneAndUpdate', function () {
        if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 10)

    })

const UserModel = model('User', userSchema)


export default UserModel