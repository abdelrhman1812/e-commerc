import { Router } from "express";
import { uploadMixOfFile } from "../../fileUpload/fileUpload.js";
import auth from "../../middleware/allowedTo.js";
import catchError from "../../middleware/catchError.js";
import { roles } from "../../utils/enum.js";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./product.controller.js";

const productRouter = Router()


/* Add Product */

productRouter.post('/', auth(roles.ADMIN), uploadMixOfFile([{ name: "imageCover", maxCount: 1 }, { name: 'images', maxCount: 10 }], 'products'), catchError(addProduct))


/* Update Product */

productRouter.put('/:id', auth(roles.ADMIN), catchError(updateProduct))

/* Delete Product */

productRouter.delete('/:id', auth(roles.ADMIN), catchError(deleteProduct))

/* Get Product */

productRouter.get('/:id', catchError(getProduct))

/* Get Products */

productRouter.get('/', catchError(getProducts))

export default productRouter;