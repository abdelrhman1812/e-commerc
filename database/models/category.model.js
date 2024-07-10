import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema({

    name: {
        type: String,
        unique: [true, 'name is unique and required'],
        trim: true,
        required: true,
        minLength: [2, ' short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        // required: true,
        unique: [true, 'slug is unique and required'],

    },
    image: {
        type: String,
    },

    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }


}, { timestamps: true, versionKey: false })



const CategoryModel = model('Category', categorySchema)

export default CategoryModel