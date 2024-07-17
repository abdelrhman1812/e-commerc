import { model, Schema, Types } from "mongoose";

const brandSchema = new Schema({

    name: {
        type: String,
        unique: [true, 'brand name must be  unique and required'],
        trim: true,
        required: true,
        minLength: [2, ' short brand name']
    },

    slug: {
        type: String,
        lowercase: true,
        required: true,
        unique: [true, 'slug must be  unique and required'],

    },

    logo: String,

    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }




}, { timestamps: true, versionKey: false })


/* */

brandSchema.post('init', (logo) => logo.logo = `http://localhost:3000/uploads/brands/${logo.logo}`)


const BrandModel = model('Brand', brandSchema)

export default BrandModel