import { model, Schema, Types } from "mongoose";

const subCategorySchema = new Schema({

    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, ' short sub category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    category: {
        type: Types.ObjectId,
        ref: "Category"
    },

    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }



}, { timestamps: true, versionKey: false })



const SubCategoryModel = model('SubCategory', subCategorySchema)

export default SubCategoryModel