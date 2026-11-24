
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.config.js";

const swaggerRouter = Router();

swaggerRouter.get("/json", (_req, res) => {
    res.json(swaggerSpec);
});

swaggerRouter.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: false,
        },
        customSiteTitle: "CAAS API Documentation",
    })
);

export default swaggerRouter;
