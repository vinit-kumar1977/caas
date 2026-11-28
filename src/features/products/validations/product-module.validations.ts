import { JSONSchemaType } from "ajv";

export interface ICreateProductModule {
    readonly moduleIds: string[];
}

export interface IUpdateProductModule {
    readonly moduleIds: string[];
}

export const createProductModuleSchema: JSONSchemaType<ICreateProductModule> = {
    type: "object",
    properties: {
        moduleIds: {
            type: "array",
            items: {
                type: "string",
                format: "uuid",
            },
            minItems: 1,
            maxItems: 100,
            uniqueItems: true,
        },
    },
    required: ["moduleIds"],
    additionalProperties: false,
};

export const updateProductModuleSchema: JSONSchemaType<IUpdateProductModule> = {
    type: "object",
    properties: {
        moduleIds: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
            },
        },
    },
    additionalProperties: false,
    required: ["moduleIds"],
};