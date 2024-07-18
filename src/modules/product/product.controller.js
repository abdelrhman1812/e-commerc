import slugify from "slugify";
import ProductModel from "../../../database/models/product.model.js";
import UserModel from "../../../database/models/user.model.js";
import ApiFeatures from "../../utils/apiFeatures.js";
import AppError from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";

/* =============== Add Product ===============  */

const addProduct = async (req, res, next) => {

    const admin = req.authUser

    const adminExist = await UserModel.findById(admin._id)

    if (!adminExist) return next(new AppError(messages.user.adminNotFound))

    const { title } = req.body;
    const slug = slugify(title)

    /* Prepar Images */
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map((img) => img.filename)


    /* Check If Exists */
    const productIsExist = await ProductModel.findOne({
        $or: [{ title }, { slug }]
    });
    if (productIsExist) return next(new AppError(messages.product.isExist), 409)

    /* Prepar Product */

    let product = new ProductModel({
        ...req.body,
        slug,
        createdBy: admin._id

    });
    await product.save();

    return res.status(201).json({ message: messages.product.successAdd, product, success: true })


}

/* =============== Update Product ===============  */

const updateProduct = async (req, res, next) => {
    const productId = req.params.id;
    let { title } = req.body;


    /* Update Slug */

    const slug = slugify(title);


    // Check if product exists
    const product = await ProductModel.findById(productId);

    if (!product) return next(new AppError(messages.product.notFound), 404);

    // Find and check if title or slug conflicts with other categories

    const conflictProduct = await ProductModel.findOne({
        $or: [{ title }],
        _id: { $ne: productId }
    });

    if (conflictProduct) return next(new AppError(messages.product.conflictproduct, 409));

    // Update the product
    const productUpdated = await ProductModel.findByIdAndUpdate(
        productId,
        { title, slug, ...req.body },
        { new: true }
    );

    res.status(200).json({ message: messages.product.successUpdate, productUpdated, success: true });
}


/* =============== Delete Product ===============  */

const deleteProduct = async (req, res, next) => {

    const productId = req.params.id

    /* Check Is Exist */

    const product = await ProductModel.findById(productId)

    if (!product) return next(new AppError(messages.product.notFound))

    /* Find And Delete */

    await ProductModel.findByIdAndDelete(productId)
    res.status(200).json({ message: messages.product.successDelete, success: true })


}


/* =============== Get Product ===============  */

const getProduct = async (req, res, next) => {

    const productId = req.params.id

    const product = await ProductModel.findById(productId)
    console.log(product)

    if (!product) next(new AppError(messages.product.notFound))

    res.status(200).json({ message: messages.product.success, product, success: true })
}



/* =============== Get Products ===============  */

const getProducts = async (req, res, next) => {

    let apiFeature = new ApiFeatures(ProductModel.find(), req.query)
        .filter()
        .sort()
        .fields()
        .search()
        .pagination();

    let count = await apiFeature.countDocuments();
    let products = await apiFeature.mongooseQuery;

    res.status(200).json({ message: messages.product.success, count, products, success: true });

};



export { addProduct, deleteProduct, getProduct, getProducts, updateProduct };


// const countProduct = await mongooseQuery.clone().countDocuments();


// let products = await mongooseQuery.exec()