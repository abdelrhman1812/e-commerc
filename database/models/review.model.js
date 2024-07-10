import { Schema, Types } from "mongoose";


const reviewScehma = new Schema({

    comment: {
        type: String,
        required: true
    },

    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },

    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

    product: {
        type: Types.ObjectId,
        ref: "Product",
        required: true
    },



}, { timestamps: true, versionKey: false })



const Review = model("Review", reviewScehma)

export default Review