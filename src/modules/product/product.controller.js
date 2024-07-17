import slugify from "slugify";
import ProductModel from "../../../database/models/product.model.js";
import UserModel from "../../../database/models/user.model.js";
import AppError from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";
import paginationFunction from "../../utils/pagination.js";

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

    const { page, size, sort, fields, search } = req.query;

    const { limit, skip } = paginationFunction({ page, size })

    /* Filter */
    let filterProduct = structuredClone(req.query)
    /* Convert It to string to use string method */

    filterProduct = JSON.stringify(filterProduct)

    filterProduct = filterProduct.replace(/(gte|gt|lt|lte)/g, value => `$${value}`)

    /* Convert It to object */

    filterProduct = JSON.parse(filterProduct)
    console.log(filterProduct)

    const exculdedFields = ['page', 'sort', 'fields', 'search']
    exculdedFields.forEach((field) => delete filterProduct[field])


    let mongooseQuery = ProductModel.find(filterProduct)


    /* Sort */

    if (sort) {
        console.log(req.query.sort)

        let sortedBy = req.query.sort.split(',').join('')
        mongooseQuery = mongooseQuery.sort(sortedBy)
    }
    /* Selecting specific fields */
    if (fields) {
        console.log(req.query.fields);
        let selectedFields = req.query.fields.split(',').join(' ');
        mongooseQuery = mongooseQuery.select(selectedFields);
    }

    /* Search */

    // Search
    if (search) {
        mongooseQuery = mongooseQuery.find({
            $or: [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ]
        });
    }




    const countProduct = await mongooseQuery.clone().countDocuments();


    let products = await mongooseQuery.exec()


    res.status(200).json({ message: messages.product.success, count: countProduct, products, success: true })
}


export { addProduct, deleteProduct, getProduct, getProducts, updateProduct };

