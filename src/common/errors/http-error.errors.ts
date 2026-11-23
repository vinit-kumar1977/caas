import { AppError } from "./app.errors.js";

export const BadRequestError = (
    message = "Bad request",
    details?: unknown
) =>
    new AppError(message, 400, {
        code: "BAD_REQUEST",
        details,
    });

export const UnauthorizedError = (
    message = "Authentication required"
) =>
    new AppError(message, 401, {
        code: "UNAUTHORIZED",
    });

export const ForbiddenError = (
    message = "Access denied"
) =>
    new AppError(message, 403, {
        code: "FORBIDDEN",
    });

export const NotFoundError = (
    message = "Resource not found"
) =>
    new AppError(message, 404, {
        code: "RESOURCE_NOT_FOUND",
    });

export const ConflictError = (
    message = "Resource already exists"
) =>
    new AppError(message, 409, {
        code: "RESOURCE_CONFLICT",
    });

export const ValidationError = (
    message = "Validation failed",
    details?: unknown
) =>
    new AppError(message, 422, {
        code: "VALIDATION_ERROR",
        details,
    });

export const InternalServerError = (
    message = "Internal server error"
) =>
    new AppError(message, 500, {
        code: "INTERNAL_SERVER_ERROR",
    });