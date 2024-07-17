import authRouter from "./authentication/auth.routes.js";
import brandRouter from "./Brand/brand.routes.js";
import categoryRouter from "./category/category.routes.js";
import productRouter from "./product/product.routes.js";
import subCategoryRouter from "./subCategory/subCategory.routes.js";


const bootstrap = (app) => {

    app.use('/api/auth', authRouter)
    app.use('/api/categories', categoryRouter);
    app.use('/api/subcategories', subCategoryRouter);
    app.use('/api/brands', brandRouter);
    app.use('/api/products', productRouter);
}

export default bootstrap;