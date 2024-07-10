import { model, Schema, Types } from "mongoose";

const productSchema = new Schema({

    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, ' short product name']
    },

    slug: {
        type: String,
        lowercase: true,
        required: true,
    },

    description: {
        type: String,
        required: true,
        minLength: 30,
        maxLength: 2000
    },

    imageCover: String,

    images: [String],

    price: {
        type: Number,
        required: true,
        min: 0
    },

    priceAfterDiscount: {
        type: Number,
        required: true,
        min: 0
    },

    sold: Number,

    stock: {
        type: Number,
        min: 0,
        required: true,

    },

    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,

    },

    subCategory: {
        type: Types.ObjectId,
        ref: "SubCategory",
        required: true,

    },

    brand: {
        type: Types.ObjectId,
        ref: "Brand",
        required: true,

    },

    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    },

    rateAvg: {
        type: Number,
        min: 0,
        max: 5
    },
    rateCount: Number









}, { timestamps: true, versionKey: false })



const Product = model('Product', productSchema)

export default Product