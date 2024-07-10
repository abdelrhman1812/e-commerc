import { model, Schema } from "mongoose";

const couponSchema = new Schema({

    code: {
        type: String,
        unique: [true, 'code must be  unique and required'],
        required: true,
    },

    expires: Date,
    discount: Number



}, { timestamps: true, versionKey: false })



const CouponModel = model('Coupon', couponSchema)

export default CouponModel