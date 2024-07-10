import { Router } from "express";
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./brand.controller.js";

const brandRouter = Router();


/* Add Brand */

brandRouter.post('/', addBrand)


/* Get Brands */

brandRouter.get('/', getBrands)

/* Get Brand */

brandRouter.get('/:id', getBrand)

/* Update Brand */

brandRouter.put('/:id', updateBrand)

/* Delete Brand */

brandRouter.delete('/:id', deleteBrand)




export default brandRouter;