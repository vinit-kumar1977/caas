export class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: string;
    public readonly isOperational: boolean;
    public readonly code?: string;
    public readonly details?: unknown;

    constructor(
        message: string,
        statusCode = 500,
        options?: {
            code?: string;
            details?: unknown;
            isOperational?: boolean;
        }
    ) {
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4")
            ? "fail"
            : "error";

        this.code = options?.code;
        this.details = options?.details;
        this.isOperational = options?.isOperational ?? true;

        Error.captureStackTrace(this, this.constructor);
    }
}