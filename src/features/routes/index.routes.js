import { Router } from "express";

const routes = Router();

routes.get("/ok", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Test route working",
  });
});
export default routes;