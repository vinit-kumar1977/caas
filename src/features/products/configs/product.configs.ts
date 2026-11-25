import type { EntityQueryPolicy } from "../../../common/schemas/query.schemas.js";

export const PRODUCT_QUERY_POLICY: EntityQueryPolicy = {
    searchableFields: [
        "name",
        "code",
    ],

    sortableFields: [
        "id",
        "name",
        "code",
        "status",
        "isPublic",
        "createdAt",
        "updatedAt",
    ],

    filterableFields: {
        name: {
            type: "string",
            operators: [
                "contains",
                "equals",
                "notEquals",
                "startsWith",
                "endsWith",
            ],
        },

        code: {
            type: "string",
            operators: [
                "contains",
                "equals",
                "notEquals",
                "startsWith",
                "endsWith",
            ],
        },

        status: {
            type: "string",
            operators: [
                "equals",
                "notEquals",
                "in",
                "notIn",
            ],
        },

        isPublic: {
            type: "boolean",
            operators: [
                "equals",
                "notEquals",
            ],
        },

        createdAt: {
            type: "date",
            operators: [
                "equals",
                "greaterThan",
                "greaterThanOrEqual",
                "lessThan",
                "lessThanOrEqual",
                "between",
                "before",
                "after",
            ],
        },

        updatedAt: {
            type: "date",
            operators: [
                "equals",
                "greaterThan",
                "greaterThanOrEqual",
                "lessThan",
                "lessThanOrEqual",
                "between",
                "before",
                "after",
            ],
        },
    },

    defaultSortBy: "createdAt",
    defaultSortOrder: "DESC",

    defaultLimit: 20,
    maxLimit: 500,
};