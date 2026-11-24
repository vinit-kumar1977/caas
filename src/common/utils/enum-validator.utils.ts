import { AppError } from "../errors/app.errors.js";

type EnumObject = Record<string, string | number>;
export function validateEnum<T extends EnumObject>(
    value: unknown,
    enumObject: T,
    field?: string,
): T[keyof T] {
    const validValues = Object.entries(enumObject)
        .filter(([key]) => Number.isNaN(Number(key)))
        .map(([, enumValue]) => enumValue);

    if (!validValues.includes(value as T[keyof T])) {
        const message = `Invalid${field ? ` ${field}` : ""} value.`;

        throw new AppError(message, 400, {
            code: "INVALID_VALUE",
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

    return value as T[keyof T];
}
