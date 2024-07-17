import { model, Schema, Types } from "mongoose";

const productSchema = new Schema({

    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [2, ' short product title']
    },

    slug: {
        type: String,
        lowercase: true,
        required: true,
    },

    description: {
        type: String,
        required: true,
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
productSchema.post('init', (doc) => {
    if (doc.imageCover) doc.imageCover = `http://localhost:3000/uploads/products/${doc.imageCover}`;


    if (doc.images) doc.images = doc.images.map(img => `http://localhost:3000/uploads/products/${img}`);

});


const ProductModel = model('Product', productSchema)

export default ProductModel