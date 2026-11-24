import { Router } from "express";
import type { Response } from "express";
import envConfigurations from "../configs/env.configs.js";
import mainRoutes from "../features/routes/index.routes.js";

const router = Router();

router.get("/health", (_req, res: Response) => {
    return res.status(200).json({
        success: true,
        status: "healthy",
        message: "Service is running successfully",
        timestamp: new Date().toISOString(),
        environment: envConfigurations.APP_ENV || "development",
    });
});

router.use("/v1", mainRoutes);

export default router;