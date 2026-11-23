import type {
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from "express";

import { AppError } from "./app.errors.js";

export const errorHandler: ErrorRequestHandler = (
    error: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {

    let statusCode = 500;
    let message = "Internal server error";
    let code = "INTERNAL_SERVER_ERROR";
    let details: unknown;

    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
        code = error.code ?? code;
        details = error.details;
    } else if (error instanceof Error) {
        // Keep internal exception details out of production responses.
        message = process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message;
    }

    // Centralized logging
    console.error({
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        statusCode,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
    });

    res.status(statusCode).json({
        success: false,
        statusCode,
        error: {
            code,
            message,
            ...(details !== undefined ? { details } : {}),
        },
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    });
};