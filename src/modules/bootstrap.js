import brandRouter from "./Brand/brand.routes.js";
import categoryRouter from "./category/category.routes.js";
import subCategoryRouter from "./subCategory/subCategory.routes.js";


const bootstrap = (app) => {

    app.use('/api/categories', categoryRouter);
    app.use('/api/subcategories', subCategoryRouter);
    app.use('/api/brands', brandRouter);
}

export default bootstrap;