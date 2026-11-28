import { Router } from "express";
import { validateRequest } from "../../../common/middlewares/validations/validate-request.validations.js";
import { fullQuerySchema, IdSchema } from "../../../common/schemas/query.schemas.js";
import { createModuleContainer } from "../containers/module.containers.js";
import { createModuleSchema, updateModuleSchema } from "../validations/module.validations.js";
const routes = Router();

const {controller} = createModuleContainer();

routes.post("/", validateRequest({body:createModuleSchema}), controller.createModule);
routes.get("/",validateRequest({query:fullQuerySchema}),controller.getAllModules);
routes.get("/list",validateRequest({query:fullQuerySchema}),controller.getAllModulesList);
routes.get("/:id",validateRequest({params:IdSchema}),controller.getModuleDetail);
routes.put("/:id",validateRequest({body:updateModuleSchema,params:IdSchema}),controller.updateModule);
routes.delete("/:id",validateRequest({params:IdSchema}),controller.deleteModule);

export default routes;