import { Router } from "express";
import { createProductContainer } from "../containers/product.containers.js";
import { validateRequest } from "../../../common/middlewares/validations/validate-request.validations.js";
import { createProductSchema, updateProductSchema } from "../validations/product.validations.js";
import { fullQuerySchema, IdSchema } from "../../../common/schemas/query.schemas.js";
const routes = Router();

const {controller} = createProductContainer();

routes.post("/", validateRequest({body:createProductSchema}), controller.createProduct);
routes.get("/",validateRequest({query:fullQuerySchema}),controller.getAllProducts);
routes.get("/list",validateRequest({query:fullQuerySchema}),controller.getAllProductsList);
routes.get('/:id',validateRequest({params:IdSchema}),controller.getProductDetail);
routes.put("/:id",validateRequest({body:updateProductSchema,params:IdSchema}),controller.updateProduct);
routes.delete("/:id",validateRequest({params:IdSchema}),controller.deleteProduct);

export default routes;