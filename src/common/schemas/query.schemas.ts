import { AnySchema } from "ajv";

export type ScalarFilterOperator =
    | "contains"
    | "equals"
    | "notEquals"
    | "startsWith"
    | "endsWith"
    | "greaterThan"
    | "greaterThanOrEqual"
    | "lessThan"
    | "lessThanOrEqual"
    | "before"
    | "after";

export type FilterOperator =
    | ScalarFilterOperator
    | "between"
    | "empty"
    | "notEmpty"
    | "in"
    | "notIn";

export type FilterConditionInterface =
    | {
        field: string;
        operator: ScalarFilterOperator;
        value: string;
    }
    | {
        field: string;
        operator: "between";
        value: [string, string];
    }
    | {
        field: string;
        operator: "in" | "notIn";
        value: string[];
    }
    | {
        field: string;
        operator: "empty" | "notEmpty";
        value?: never;
    };

export interface PaginationInterface {
    page?: number;
    limit?: number;
}

export interface PaginationMetaInterface {
    totalRecord: number;
    totalPage: number;
    currentPage: number;
    perPage: number;
    nextPage: boolean;
    prevPage: boolean;
}

export interface SearchInterface {
    searchField?: string;
    search?: string;
}

export interface SortingInterface {
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
}

export interface FilterInterface {
    filters?: FilterConditionInterface[];
}

export type SearchingAndSortingInterface =
    SearchInterface & SortingInterface;

export type FullQueryInterface =
    PaginationInterface &
    SearchInterface &
    SortingInterface &
    FilterInterface;

export interface QueryFieldPolicy {
    operators: FilterOperator[];
    type: "string" | "number" | "date" | "boolean";
}

export interface EntityQueryPolicy {
    searchableFields: string[];
    sortableFields: string[];
    filterableFields: Record<string, QueryFieldPolicy>;
    defaultSortBy: string;
    defaultSortOrder: "ASC" | "DESC";
    defaultLimit: number;
    maxLimit: number;
}

export const IdSchema: AnySchema = {
    type: "object",
    additionalProperties: false,
    required: ["id"],
    properties: {
        id: {
            type: "string",
            format: "uuid",
        },
    }
};

export const fullQuerySchema = {
    type: "object",
    additionalProperties: false,
    properties: {
        page: {
            type: "integer",
            minimum: 1,
            maximum: 1000000000000,
        },
        limit: {
            type: "integer",
            minimum: 1,
            maximum: 100,
        },
        searchField: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            pattern: "^[a-zA-Z][a-zA-Z0-9_]{0,99}$",
        },
        search: {
            type: "string",
            minLength: 1,
            maxLength: 200,
            pattern: ".*\\S.*",
        },
        sortBy: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            pattern: "^[a-zA-Z][a-zA-Z0-9_]{0,99}$",
        },
        sortOrder: {
            type: "string",
            enum: ["ASC", "DESC"],
        },
        filters: {
            type: "array",
            maxItems: 20,
            items: {
                type: "object",
                additionalProperties: false,
                required: ["field", "operator"],
                properties: {
                    field: {
                        type: "string",
                        minLength: 1,
                        maxLength: 100,
                        pattern: "^[a-zA-Z][a-zA-Z0-9_]{0,99}$",
                    },

                    operator: {
                        type: "string",
                        enum: [
                            "contains",
                            "equals",
                            "notEquals",
                            "startsWith",
                            "endsWith",
                            "greaterThan",
                            "greaterThanOrEqual",
                            "lessThan",
                            "lessThanOrEqual",
                            "between",
                            "empty",
                            "notEmpty",
                            "before",
                            "after",
                            "in",
                            "notIn",
                        ],
                    },
                    value: {
                        oneOf: [
                            {
                                type: "string",
                                minLength: 1,
                                maxLength: 500,
                            },
                            {
                                type: "array",
                                minItems: 1,
                                maxItems: 100,
                                items: {
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 500,
                                },
                            },
                        ],
                    },
                },
                allOf: [
                    {
                        if: {
                            properties: {
                                operator: {
                                    enum: [
                                        "contains",
                                        "equals",
                                        "notEquals",
                                        "startsWith",
                                        "endsWith",
                                        "greaterThan",
                                        "greaterThanOrEqual",
                                        "lessThan",
                                        "lessThanOrEqual",
                                        "before",
                                        "after",
                                    ],
                                },
                            },
                            required: ["operator"],
                        },
                        then: {
                            required: ["value"],
                            properties: {
                                value: {
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 500,
                                },
                            },
                        },
                    },
                    {
                        if: {
                            properties: {
                                operator: { const: "between" },
                            },
                            required: ["operator"],
                        },
                        then: {
                            required: ["value"],
                            properties: {
                                value: {
                                    type: "array",
                                    minItems: 2,
                                    maxItems: 2,
                                    items: {
                                        type: "string",
                                        minLength: 1,
                                        maxLength: 500,
                                    },
                                },
                            },
                        },
                    },
                    {
                        if: {
                            properties: {
                                operator: {
                                    enum: ["in", "notIn"],
                                },
                            },
                            required: ["operator"],
                        },
                        then: {
                            required: ["value"],
                            properties: {
                                value: {
                                    type: "array",
                                    minItems: 1,
                                    maxItems: 100,
                                    items: {
                                        type: "string",
                                        minLength: 1,
                                        maxLength: 500,
                                    },
                                },
                            },
                        },
                    },
                    {
                        if: {
                            properties: {
                                operator: {
                                    enum: ["empty", "notEmpty"],
                                },
                            },
                            required: ["operator"],
                        },
                        then: {
                            not: {
                                required: ["value"],
                            },
                        },
                    },
                ],
            },
        },
    },
} as const;
