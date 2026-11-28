import {
    ObjectLiteral,
    SelectQueryBuilder,
} from "typeorm";

import { AppError } from "../errors/app.errors.js";

import {
    EntityQueryPolicy,
    FilterConditionInterface,
    FullQueryInterface,
    QueryFieldPolicy,
} from "../schemas/query.schemas.js";

function escapeLike(value: string): string {
    return value.replace(/[!%_]/g, "!$&");
}

function normalizeSearch(
    search?: string,
): string | undefined {
    if (search === undefined) return undefined;

    const value = search.trim();

    if (!value) return undefined;

    return value;
}

function validateSearchField(
    field: string,
    policy: EntityQueryPolicy,
): void {
    if (!policy.searchableFields.includes(field)) {
        throw new AppError(
            "Invalid search field.",
            400,
        );
    }
}

function validateSort(
    query: FullQueryInterface,
    policy: EntityQueryPolicy,
): {
    field: string;
    order: "ASC" | "DESC";
} {
    const field =
        query.sortBy ?? policy.defaultSortBy;

    if (!policy.sortableFields.includes(field)) {
        throw new AppError(
            "Invalid sort field.",
            400,
        );
    }

    const order =
        query.sortOrder ?? policy.defaultSortOrder;

    if (order !== "ASC" && order !== "DESC") {
        throw new AppError(
            "Invalid sort order.",
            400,
        );
    }

    return { field, order };
}

function validateFilter(
    filter: FilterConditionInterface,
    policy: EntityQueryPolicy,
): QueryFieldPolicy {
    const fieldPolicy =
        policy.filterableFields[filter.field];

    if (!fieldPolicy) {
        throw new AppError(
            `Filter field "${filter.field}" is not allowed.`,
            400,
        );
    }

    if (!fieldPolicy.operators.includes(filter.operator)) {
        throw new AppError(
            `Operator "${filter.operator}" is not allowed for "${filter.field}".`,
            400,
        );
    }

    return fieldPolicy;
}

function normalizeFilterValue(
    value: string,
    fieldPolicy: QueryFieldPolicy,
): string | number | boolean | Date {
    switch (fieldPolicy.type) {
        case "string":
            return value;

        case "number": {
            const numberValue = Number(value);

            if (!Number.isFinite(numberValue)) {
                throw new AppError(
                    "Invalid numeric filter value.",
                    400,
                );
            }

            return numberValue;
        }

        case "boolean": {
            if (value === "true") return true;
            if (value === "false") return false;

            throw new AppError(
                "Invalid boolean filter value.",
                400,
            );
        }

        case "date": {
            const date = new Date(value);

            if (Number.isNaN(date.getTime())) {
                throw new AppError(
                    "Invalid date filter value.",
                    400,
                );
            }

            return date;
        }
    }
}

function applyFilter<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    filter: FilterConditionInterface,
    index: number,
    fieldPolicy: QueryFieldPolicy,
): void {
    const column = `${alias}.${filter.field}`;
    const parameter = `filter_${index}`;

    switch (filter.operator) {
        case "equals":
        case "greaterThan":
        case "greaterThanOrEqual":
        case "lessThan":
        case "lessThanOrEqual":
        case "before":
        case "after":
        case "notEquals": {
            const value = normalizeFilterValue(
                filter.value,
                fieldPolicy,
            );

            const operators: Record<string, string> = {
                equals: "=",
                notEquals: "!=",
                greaterThan: ">",
                greaterThanOrEqual: ">=",
                lessThan: "<",
                lessThanOrEqual: "<=",
                before: "<",
                after: ">",
            };

            const sqlOperator =
                operators[filter.operator];

            qb.andWhere(
                `${column} ${sqlOperator} :${parameter}`,
                {
                    [parameter]: value,
                },
            );

            break;
        }

        case "contains":
        case "startsWith":
        case "endsWith": {
            if (fieldPolicy.type !== "string") {
                throw new AppError(
                    "String operator applied to non-string field.",
                    400,
                );
            }

            let value = escapeLike(filter.value);

            if (filter.operator === "contains") {
                value = `%${value}%`;
            } else if (filter.operator === "startsWith") {
                value = `${value}%`;
            } else {
                value = `%${value}`;
            }

            qb.andWhere(
                `${column} ILIKE :${parameter} ESCAPE '!'`,
                {
                    [parameter]: value,
                },
            );

            break;
        }

        case "between": {
            const [start, end] = filter.value;

            const normalizedStart =
                normalizeFilterValue(
                    start,
                    fieldPolicy,
                );

            const normalizedEnd =
                normalizeFilterValue(
                    end,
                    fieldPolicy,
                );

            qb.andWhere(
                `${column} BETWEEN :${parameter}_start AND :${parameter}_end`,
                {
                    [`${parameter}_start`]: normalizedStart,
                    [`${parameter}_end`]: normalizedEnd,
                },
            );

            break;
        }

        case "in":
        case "notIn": {
            if (filter.value.length === 0) {
                throw new AppError(
                    "Invalid filter array.",
                    400,
                );
            }

            const values = filter.value.map(
                (value) =>
                    normalizeFilterValue(
                        value,
                        fieldPolicy,
                    ),
            );

            if (filter.operator === "in") {
                qb.andWhere(
                    `${column} IN (:...${parameter})`,
                    {
                        [parameter]: values,
                    },
                );
            } else {
                qb.andWhere(
                    `${column} NOT IN (:...${parameter})`,
                    {
                        [parameter]: values,
                    },
                );
            }

            break;
        }

        case "empty":
            if (fieldPolicy.type !== "string") {
                throw new AppError(
                    "Empty operator is only allowed for string fields.",
                    400,
                );
            }

            qb.andWhere(
                `(${column} IS NULL OR ${column} = '')`,
            );

            break;

        case "notEmpty":
            if (fieldPolicy.type !== "string") {
                throw new AppError(
                    "NotEmpty operator is only allowed for string fields.",
                    400,
                );
            }

            qb.andWhere(
                `(${column} IS NOT NULL AND ${column} != '')`,
            );

            break;
    }
}

export function applySearchSortFilters<
    T extends ObjectLiteral,
>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    query: FullQueryInterface,
    policy: EntityQueryPolicy,
): SelectQueryBuilder<T> {
    const search = normalizeSearch(query.search);

    if (search) {
        if (query.searchField) {
            validateSearchField(
                query.searchField,
                policy,
            );

            qb.andWhere(
                `${alias}.${query.searchField} ILIKE :search ESCAPE '!'`,
                {
                    search: `%${escapeLike(search)}%`,
                },
            );
        } else if (
            policy.searchableFields.length > 0
        ) {
            const conditions =
                policy.searchableFields.map(
                    (field, index) =>
                        `${alias}.${field} ILIKE :search_${index} ESCAPE '!'`,
                );

            const parameters = Object.fromEntries(
                policy.searchableFields.map(
                    (field, index) => [
                        `search_${index}`,
                        `%${escapeLike(search)}%`,
                    ],
                ),
            );

            qb.andWhere(
                `(${conditions.join(" OR ")})`,
                parameters,
            );
        }
    } else if (query.searchField) {
        throw new AppError(
            "searchField cannot be provided without search.",
            400,
        );
    }

    const filters = query.filters ?? [];

    filters.forEach((filter, index) => {
        const fieldPolicy = validateFilter(
            filter,
            policy,
        );

        applyFilter(
            qb,
            alias,
            filter,
            index,
            fieldPolicy,
        );
    });

    const sort = validateSort(
        query,
        policy,
    );

    qb.orderBy(
        `${alias}.${sort.field}`,
        sort.order,
    );

    if (
        policy.sortableFields.includes("id") &&
        sort.field !== "id"
    ) {
        qb.addOrderBy(
            `${alias}.id`,
            "ASC",
        );
    }

    return qb;
}

export async function paginateQuery<
    T extends ObjectLiteral,
>(
    qb: SelectQueryBuilder<T>,
    query: FullQueryInterface,
    policy: EntityQueryPolicy,
) {
    const page = query.page ?? 1;

    const limit = Math.min(
        query.limit ?? policy.defaultLimit,
        policy.maxLimit,
    );

    if (
        !Number.isSafeInteger(page) ||
        page < 1
    ) {
        throw new AppError(
            "Invalid page.",
            400,
        );
    }

    if (
        !Number.isSafeInteger(limit) ||
        limit < 1
    ) {
        throw new AppError(
            "Invalid limit.",
            400,
        );
    }

    const offset = (page - 1) * limit;
    if (!Number.isSafeInteger(offset)) {
        throw new AppError(
            "Invalid pagination offset.",
            400,
        );
    }

    const [data, totalRecord] = await qb
        .skip(offset)
        .take(limit)
        .getManyAndCount();

    const totalPage = Math.ceil(
        totalRecord / limit,
    );

    return {
        data,
        pagination: {
            totalRecord,
            totalPage,
            currentPage: page,
            perPage: limit,
            nextPage: page < totalPage,
            prevPage: page > 1 && page <= totalPage,
        },
    };
}