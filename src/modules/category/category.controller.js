import slugify from "slugify";
import CategoryModel from "../../../database/models/category.model.js";
import UserModel from "../../../database/models/user.model.js";
import AppError from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";



/* ==========  Add Category ==========  */

const addCategory = async (req, res, next) => {
    const admin = req.authUser

    const adminExist = await UserModel.findById(admin._id)

    if (!adminExist) return next(new AppError(messages.user.adminNotFound))

    const { name } = req.body;
    const slug = slugify(name)

    const categoryIsExist = await CategoryModel.findOne({
        $or: [{ name }, { slug }]
    });
    if (categoryIsExist) return next(new AppError(messages.category.isExist), 409)

    let category = new CategoryModel({
        name,
        slug,
        createdBy: admin._id

    });
    await category.save();

    return res.status(201).json({ message: messages.category.successAdd, category, success: true })


}


/* ========== Get Categories ========== */

const getCategories = async (req, res, next) => {

    const categories = await CategoryModel.find()

    return res.status(200).json({ message: messages.category.success, categories, success: true })

}

/* ========== Get Category ========== */

const getCategory = async (req, res, next) => {

    const categoryId = req.params.id

    const category = await CategoryModel.findById(categoryId)

    if (!category) return next(new AppError(messages.category.notFound), 404)

    return res.status(200).json({ message: messages.category.success, category, success: true })

}


/* ========== Update Category ========== */

const updateCategory = async (req, res, next) => {
    const categoryId = req.params.id;
    let { name, slug } = req.body;

    //  slug from name if slug is not exist
    if (!slug) {
        slug = slugify(name);
    }

    // Check if category exists
    const category = await CategoryModel.findById(categoryId);

    if (!category) return next(new AppError(messages.category.notFound), 404);

    // Find and check if name or slug conflicts with other categories

    const conflictCategory = await CategoryModel.findOne({
        $or: [{ name }, { slug }],
        _id: { $ne: categoryId }
    });

    if (conflictCategory) return next(new AppError(messages.category.conflictCategory, 409));

    // Update the category
    const categoryUpdated = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { name, slug },
        { new: true }
    );

    res.status(200).json({ message: messages.category.successUpdate, categoryUpdated, success: true });
};


/* ========== Delete Category ========== */

const deleteCategory = async (req, res, next) => {

    const categoryId = req.params.id;

    // Check if category exists
    const category = await CategoryModel.findById(categoryId);

    if (!category) return next(new AppError(messages.category.notFound), 404);

    await CategoryModel.findByIdAndDelete(categoryId)
    res.status(200).json({ message: messages.category.successDelete, success: true });


}



export { addCategory, deleteCategory, getCategories, getCategory, updateCategory };

