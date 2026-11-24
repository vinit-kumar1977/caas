
import { QueryFailedError } from "typeorm";
import { AppError } from "./app.errors.js";

interface PostgreSQLDriverError {
    code?: string;
    constraint?: string;
    column?: string;
    detail?: string;
}

interface DatabaseError {
    code?: string;
    constraint?: string;
    column?: string;
    detail?: string;
}

/**
 * Extract PostgreSQL error information from TypeORM.
 */
function getDatabaseError(error: unknown): DatabaseError | undefined {
    if (!(error instanceof QueryFailedError)) {
        return undefined;
    }

    const driverError =
        error.driverError as PostgreSQLDriverError;

    return {
        code: driverError.code,
        constraint: driverError.constraint,
        column: driverError.column,
        detail: driverError.detail,
    };
}

/**
 * Map database constraint names to application fields.
 */
const CONSTRAINT_FIELDS: Record<string, string> = {
    chk_products_code_format: "code",
    chk_products_status: "status",
};

/**
 * Convert PostgreSQL constraint violations into readable errors.
 */
function handleCheckConstraintError(
    dbError: DatabaseError,
): AppError {
    const field = dbError.constraint
        ? CONSTRAINT_FIELDS[dbError.constraint]
        : undefined;

    const message = field
        ? `Invalid ${field} value.`
        : "One or more provided values violate a data constraint.";

    return new AppError(message, 400, {
        code: "CHECK_CONSTRAINT_VIOLATION",
        ...(field && {
            details: [
                {
                    field,
                    message,
                },
            ],
        }),
    });
}

/**
 * Centralized service error handler.
 */
export function handleServiceError(error: unknown): AppError {
    // Preserve existing application errors.
    if (error instanceof AppError) {
        return error;
    }

    const dbError = getDatabaseError(error);

    if (dbError) {
        switch (dbError.code) {
            case "23505":
                return new AppError(
                    "A record with the provided information already exists.",
                    409,
                    { code: "DUPLICATE_RECORD" },
                );

            case "23503":
                return new AppError(
                    "The requested operation references a record that does not exist or is still in use.",
                    409,
                    { code: "FOREIGN_KEY_VIOLATION" },
                );

            case "23502": {
                const field = dbError.column;
                const message = field
                    ? `${field} is required.`
                    : "A required field is missing.";

                return new AppError(message, 400, {
                    code: "REQUIRED_FIELD_MISSING",
                    ...(field && {
                        details: [{ field, message }],
                    }),
                });
            }

            case "22P02":
                return new AppError(
                    "One or more provided values have an invalid format.",
                    400,
                    { code: "INVALID_INPUT_FORMAT" },
                );

            case "22001":
                return new AppError(
                    "One or more provided values exceed the allowed length.",
                    400,
                    { code: "VALUE_TOO_LONG" },
                );

            case "23514":
                return handleCheckConstraintError(dbError);
        }

        // Log unhandled PostgreSQL errors internally.
        console.error("Unhandled PostgreSQL error:", {
            code: dbError.code,
            constraint: dbError.constraint,
            column: dbError.column,
        });
    }

    // Unexpected errors.
    return new AppError(
        "An unexpected error occurred. Please try again later.",
        500,
        {
            code: "INTERNAL_SERVER_ERROR",
            isOperational: false,
        },
    );
}
