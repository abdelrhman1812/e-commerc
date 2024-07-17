import fs from 'fs';
import slugify from "slugify";
import BrandModel from "../../../database/models/brand.model.js";
import AppError from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";


/* ==========  Add Brand ==========  */

const addBrand = async (req, res, next) => {

    const { name } = req.body;
    const slug = slugify(name)

    if (req.file) req.body.log = req.file.filename


    const brandIsExist = await BrandModel.findOne({
        $or: [{ name }, { slug }]
    });
    if (brandIsExist) return next(new AppError(messages.brand.isExist), 409)

    let brand = new BrandModel({
        name,
        slug,
        logo: req.body.log
    });
    await brand.save();

    return res.status(201).json({ message: messages.brand.successAdd, brand, success: true })


}


/* ========== Get Brands ========== */

const getBrands = async (req, res, next) => {

    const brands = await BrandModel.find()

    return res.status(200).json({ message: messages.brand.success, brands, success: true })

}

/* ========== Get Brand ========== */

const getBrand = async (req, res, next) => {

    const brandId = req.params.id

    const brand = await BrandModel.findById(brandId)

    if (!brand) return next(new AppError(messages.brand.notFound), 404)

    return res.status(200).json({ message: messages.brand.success, brand, success: true })

}


/* ========== Update Brand ========== */

const updateBrand = async (req, res, next) => {

    const brandId = req.params.id;
    let { name, slug } = req.body;

    //  slug from name if slug is not exist

    req.body.slug = slugify(req.body.name)

    if (req.file) req.body.logo = req.file.filename

    // Check if brand exists

    const brand = await BrandModel.findById(brandId);

    if (!brand) return next(new AppError(messages.brand.notFound), 404);
    console.log(brand.logo.split('/').splice(5).join('/'))

    // Delete old image if it exists
    if (req.file && brand.logo) {
        const oldImagePath = brand.logo.split('/').splice(5).join('/');
        const fullPath = `uploads/brands/${oldImagePath}`;
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }

    // Find and check if name or slug conflicts with other categories

    const conflictBrand = await BrandModel.findOne({
        $or: [{ name }, { slug }],
        _id: { $ne: brandId }
    });

    if (conflictBrand) return next(new AppError(messages.brand.conflictbrand, 409));

    // Update the brand
    const brandUpdated = await BrandModel.findByIdAndUpdate(
        brandId,
        req.body,

        { new: true }
    );

    res.status(200).json({ message: messages.brand.successUpdate, brandUpdated, success: true });
};


/* ========== Delete Brand ========== */

const deleteBrand = async (req, res, next) => {

    const brandId = req.params.id;

    // Check if Brand exists

    const brand = await BrandModel.findById(brandId);

    if (!brand) return next(new AppError(messages.brand.notFound), 404);

    await BrandModel.findByIdAndDelete(brandId)
    res.status(200).json({ message: messages.brand.successDelete, success: true });


}



export { addBrand, deleteBrand, getBrand, getBrands, updateBrand };

