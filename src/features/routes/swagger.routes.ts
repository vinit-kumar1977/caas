import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../configs/swagger/swagger.config.js";

const router = Router();

router.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
    }),
);

router.get("/docs.json", (_req, res) => {
    res.json(swaggerSpec);
});

export default router;