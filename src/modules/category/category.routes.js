import { Router } from "express";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import auth from "../../middleware/allowedTo.js";
import catchError from "../../middleware/catchError.js";
import { roles } from "../../utils/enum.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";

const categoryRouter = Router();

/* merge params */
categoryRouter.use('/:categoryId/subcategories', subCategoryRouter)


/* Add Category */

categoryRouter.post('/', auth(roles.ADMIN), uploadSingleFile('image', 'categories'), catchError(addCategory));

/* Get Categories */

categoryRouter.get('/', catchError(getCategories));

/* Get Category */

categoryRouter.get('/:id', catchError(getCategory));

/* Update Category */

categoryRouter.put('/:id', auth(roles.ADMIN), uploadSingleFile('image', 'categories'), catchError(updateCategory));

/* Delete Category */

categoryRouter.delete('/:id', auth(roles.ADMIN), catchError(deleteCategory));





export default categoryRouter;