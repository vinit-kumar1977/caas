import { AppError } from "../errors/app.errors.js";
import { FullQueryInterface } from "../schemas/query.schemas.js";

function parseInteger(
    value: unknown,
    field: string,
): number | undefined {
    if (value === undefined) return undefined;

    if (typeof value !== "string") {
        throw new AppError(
            `Invalid ${field}.`,
            400,
        );
    }

    if (!/^\d+$/.test(value)) {
        throw new AppError(
            `Invalid ${field}.`,
            400,
        );
    }

    const result = Number(value);

    if (!Number.isSafeInteger(result)) {
        throw new AppError(
            `Invalid ${field}.`,
            400,
        );
    }

    return result;
}

function parseFilters(
    value: unknown,
): FullQueryInterface["filters"] {
    if (value === undefined) return undefined;

    if (typeof value !== "string") {
        throw new AppError(
            "Invalid filters.",
            400,
        );
    }

    try {
        const parsed = JSON.parse(value);

        if (!Array.isArray(parsed)) {
            throw new Error();
        }

        return parsed;
    } catch {
        throw new AppError(
            "Invalid filters JSON.",
            400,
        );
    }
}

export function parseFullQuery(
    raw: Record<string, unknown>,
): FullQueryInterface {
    return {
        page: parseInteger(raw.page, "page"),
        limit: parseInteger(raw.limit, "limit"),

        search:
            typeof raw.search === "string"
                ? raw.search
                : undefined,

        searchField:
            typeof raw.searchField === "string"
                ? raw.searchField
                : undefined,

        sortBy:
            typeof raw.sortBy === "string"
                ? raw.sortBy
                : undefined,

        sortOrder:
            typeof raw.sortOrder === "string"
                ? raw.sortOrder.toUpperCase() as "ASC" | "DESC"
                : undefined,

        filters: parseFilters(raw.filters),
    };
}