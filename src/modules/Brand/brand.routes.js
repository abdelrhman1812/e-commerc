import { Router } from "express";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./brand.controller.js";

const brandRouter = Router();


/* Add Brand */

brandRouter.post('/', uploadSingleFile('logo', 'brands'), addBrand)


/* Get Brands */

brandRouter.get('/', getBrands)

/* Get Brand */

brandRouter.get('/:id', getBrand)

/* Update Brand */

brandRouter.put('/:id', uploadSingleFile('logo', 'brands'), updateBrand)

/* Delete Brand */

brandRouter.delete('/:id', deleteBrand)




export default brandRouter;