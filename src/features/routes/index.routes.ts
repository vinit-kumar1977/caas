import { Router } from "express";
import productRoutes from "../products/routes/product.routes.js";
const routes = Router();

routes.use("/products", productRoutes);

export default routes;