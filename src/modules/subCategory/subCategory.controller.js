import slugify from "slugify";
import CategoryModel from "../../../database/models/category.model.js";
import SubCategoryModel from "../../../database/models/subCategory.model.js";
import ApiFeatures from "../../utils/apiFeatures.js";
import AppError from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";



/* ==========  Add Sub Category ==========  */

const addSubCategory = async (req, res, next) => {

    const { name, category } = req.body;
    const slug = slugify(name)

    const getCategory = await CategoryModel.findById(category);
    if (!getCategory) return next(new AppError(messages.category.notFound))

    const subCategoryIsExist = await SubCategoryModel.findOne({
        $or: [{ name }, { slug }]
    });
    if (subCategoryIsExist) return next(new AppError(messages.subCategory.isExist), 409)

    let subCategory = new SubCategoryModel({
        name,
        slug,
        category
    });
    await subCategory.save();

    return res.status(201).json({ message: messages.subCategory.successAdd, subCategory, success: true })


}


/* ========== Get Sub Categories ========== */

const getSubCategories = async (req, res, next) => {

    let filter = {}
    if (req.params.categoryId) filter.category = req.params.categoryId
    let apiFeature = new ApiFeatures(SubCategoryModel.find(filter), req.query)
        .filter()
        .sort()
        .fields()
        .search()
        .pagination();

    let count = await apiFeature.countDocuments();
    let subCategories = await apiFeature.mongooseQuery;

    res.status(200).json({ message: messages.subCategory.success, count, subCategories, success: true });

}

/* ========== Get Category ========== */

const getSubCategory = async (req, res, next) => {

    const subCategoryId = req.params.id

    const subcategory = await SubCategoryModel.findById(subCategoryId)

    if (!subcategory) return next(new AppError(messages.subCategory.notFound), 404)

    return res.status(200).json({ message: messages.category.success, subcategory, success: true })

}


/* ========== Update Category ========== */

const updateSubCategory = async (req, res, next) => {
    const subCategoryId = req.params.id;
    let { name, slug } = req.body;

    //  slug from name if slug is not exist
    if (!slug) {
        slug = slugify(name);
    }

    // Check if category exists
    const subCategory = await SubCategoryModel.findById(subCategoryId);

    if (!subCategory) return next(new AppError(messages.subCategory.notFound), 404);

    // Find and check if name or slug conflicts with other categories

    const conflictSubCategory = await SubCategoryModel.findOne({
        $or: [{ name }, { slug }],
        _id: { $ne: subCategoryId }
    });
    console.log(conflictSubCategory)

    if (conflictSubCategory) return next(new AppError(messages.subCategory.conflictSubCategory, 409));

    // Update the category
    const subCategoryUpdated = await SubCategoryModel.findByIdAndUpdate(
        subCategoryId,
        { name, slug },
        { new: true }
    );

    res.status(200).json({ message: messages.subCategory.successUpdate, subCategoryUpdated, success: true });
};


/* ========== Delete Category ========== */

const deleteSubCategory = async (req, res, next) => {

    const subCategoryId = req.params.id;

    // Check if category exists
    const subCategory = await SubCategoryModel.findById(subCategoryId);

    if (!subCategory) return next(new AppError(messages.category.notFound), 404);

    await SubCategoryModel.findByIdAndDelete(subCategory)
    res.status(200).json({ message: messages.subCategory.successDelete, success: true });


}



export { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory };

