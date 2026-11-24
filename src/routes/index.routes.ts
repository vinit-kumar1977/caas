import { Router } from "express";
import type { Response } from "express";
// import mainRoutes from "../features/routes/index.routes.js";

const router = Router();

router.get("/health", (_req, res: Response) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});


// router.use("/v1", mainRoutes);

export default router;