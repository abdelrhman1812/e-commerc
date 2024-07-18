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
        ref: "User",
        require: true
    }


}, { timestamps: true, versionKey: false })


/* */

categorySchema.post('init', (doc) => {
    if (doc.image) {
        doc.image = `http://localhost:3000/uploads/categories/${doc.image}`;
    }
});


const CategoryModel = model('Category', categorySchema)

export default CategoryModel