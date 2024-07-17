import catchError from "../../middleware/catchError.js";
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from "./subCategory.controller.js";

import { Router } from "express";

const subCategoryRouter = Router({ mergeParams: true });




/* Add Sub Category */

subCategoryRouter.post('/', catchError(addSubCategory));

/* Get Sub Categories */

subCategoryRouter.get('/', catchError(getSubCategories));

/* Get Sub Category */

subCategoryRouter.get('/:id', catchError(getSubCategory));

/* Update Sub Category */

subCategoryRouter.put('/:id', catchError(updateSubCategory));

/* Delete Sub Category */

subCategoryRouter.delete('/:id', catchError(deleteSubCategory));




export default subCategoryRouter;