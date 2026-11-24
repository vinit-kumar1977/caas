import { AnySchema } from "ajv";
import { ProductStatus } from "../enums/product-status.enums.js";

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue =
    | JsonPrimitive
    | JsonValue[]
    | { [key: string]: JsonValue };

export interface ProductSettings {
    [key: string]: JsonValue;
}

export interface ICreateProduct {
    name: string;
    code: string;
    description?: string | null;
    logo?: string | null;
    status?: ProductStatus;
    isPublic?: boolean;
    settings?: ProductSettings;
}

export interface IUpdateProduct {
    name?: string;
    description?: string | null;
    logo?: string | null;
    status?: ProductStatus;
    isPublic?: boolean;
    settings?: ProductSettings;
}

const productProperties = {
    name: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        pattern: ".*\\S.*",
    },

    code: {
        type: "string",
        minLength: 3,
        maxLength: 50,
        pattern: "^[a-z][a-z0-9_]{2,49}$",
    },

    description: {
        type: ["string", "null"],
        maxLength: 5000,
    },

    logo: {
        type: ["string", "null"],
        maxLength: 255,
        pattern: "^[^\\u0000-\\u001F\\u007F]*$",
    },

    status: {
        type: "string",
        enum: Object.values(ProductStatus),
    },

    isPublic: {
        type: "boolean",
    },

    settings: {
        type: "object",
        maxProperties: 50,

        propertyNames: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            pattern: "^(?!(__proto__|prototype|constructor)$)[a-zA-Z0-9_.-]+$",
        },
    },
};


export const createProductSchema: AnySchema = {
    type: "object",

    additionalProperties: false,

    required: [
        "name",
        "code",
    ],

    properties: productProperties,
};

export const updateProductSchema: AnySchema = {
    type: "object",

    additionalProperties: false,

    minProperties: 1,

    properties: {
        name: productProperties.name,
        description: productProperties.description,
        logo: productProperties.logo,
        status: productProperties.status,
        isPublic: productProperties.isPublic,
        settings: productProperties.settings,
    },
};

export const productIdSchema: AnySchema = {
    type: "object",

    additionalProperties: false,

    required: ["id"],

    properties: {
        id: {
            type: "string",
            format: "uuid",
        },
    },
};


export const productListQuerySchema: AnySchema = {
    type: "object",

    additionalProperties: false,

    properties: {
        search: {
            type: "string",
            minLength: 1,
            maxLength: 100,
        },

        status: productProperties.status,

        isPublic: {
            type: "boolean",
        },

        page: {
            type: "integer",
            minimum: 1,
            maximum: 1000000,
        },

        limit: {
            type: "integer",
            minimum: 1,
            maximum: 100,
        },

        sortBy: {
            type: "string",
            enum: ["name", "code", "createdAt", "updatedAt"],
        },

        sortOrder: {
            type: "string",
            enum: ["ASC", "DESC"],
        },
    },
};