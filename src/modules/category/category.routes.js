import { Router } from "express";
import auth from "../../middleware/auth.js";
import catchError from "../../middleware/catchError.js";
import verifyToken from "../../middleware/verifyToken.js";
import { roles } from "../../utils/enum.js";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";

const categoryRouter = Router();


/* Add Category */

categoryRouter.post('/', verifyToken, auth(roles.ADMIN), catchError(addCategory));

/* Get Categories */

categoryRouter.get('/', catchError(getCategories));

/* Get Category */

categoryRouter.get('/:id', catchError(getCategory));

/* Update Category */

categoryRouter.put('/:id', catchError(updateCategory));

/* Delete Category */

categoryRouter.delete('/:id', catchError(deleteCategory));



export default categoryRouter;