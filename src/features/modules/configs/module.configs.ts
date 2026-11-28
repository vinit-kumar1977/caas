import type { EntityQueryPolicy } from "../../../common/schemas/query.schemas.js";

export const MODULE_QUERY_POLICY: EntityQueryPolicy = {
    searchableFields: [
        "name",
    ],

    sortableFields: [
        "id",
        "name",
        "status",
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

        status: {
            type: "string",
            operators: [
                "equals",
                "notEquals",
                "in",
                "notIn",
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