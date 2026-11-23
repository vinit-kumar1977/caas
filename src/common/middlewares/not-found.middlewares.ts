import type {
    Request,
    Response,
} from "express";
import { ApiResponse } from "../utils/api-response.utils.js";

export const notFoundMiddleware = (
    req: Request,
    res: Response,
): void => {
    ApiResponse.error(res, {
    statusCode: 404,
    message: "The requested endpoint does not exist.",
    errors: {
      code: "ROUTE_NOT_FOUND",
      message: "The requested endpoint does not exist.",
      details: { method: req.method, path: req.originalUrl },
    },
  });
};