import { Router } from "express";
import { createProductContainer } from "../containers/product.containers.js";
import { validateRequest } from "../../../common/middlewares/validations/validate-request.validations.js";
import { createProductSchema } from "../schemas/product.schemas.js";
const routes = Router();

const {controller} = createProductContainer();
routes.post("/", validateRequest({body:createProductSchema}), controller.createProduct);

export default routes;