import { Router } from "express";
import productRoutes from "../products/routes/product.routes.js";
import moduleRoutes from "../modules/routes/module.routes.js"
const routes = Router();

routes.use("/products", productRoutes);
routes.use("/modules",moduleRoutes);

export default routes;