import { AnySchema } from "ajv";
import { ModuleStatus } from "../enums/module.enums.js";

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue =
    | JsonPrimitive
    | JsonValue[]
    | { [key: string]: JsonValue };

export interface ModuleSettingsInterface {
    [key: string]: JsonValue;
}

export interface ICreateModule {
    name: string;
    description?: string | null;
    routeKey: string;
    icon?: string | null;
    status?: ModuleStatus;
    sortOrder?: number;
    settings?: ModuleSettingsInterface;
}

export interface IUpdateModule {
    name: string;
    description?: string | null;
    routeKey?: string;
    icon?: string | null;
    status?: ModuleStatus;
    sortOrder?: number;
    settings?: ModuleSettingsInterface;
}

const settingsSchema = {
    type: "object",
    maxJsonBytes: 65536,
    additionalProperties: true,
} as const;

const moduleProperties = {
    name: {
        type: "string",
        minLength: 2,
        maxLength: 150,
        pattern: "^(?=.*\\S)[^\\u0000-\\u001F\\u007F]+$",
    },

    description: {
        type: ["string", "null"],
        maxLength: 5000,
        nullable: true,
    },

    routeKey: {
        type: "string",
        minLength: 2,
        maxLength: 150,
        pattern: "^[a-z][a-z0-9_-]{1,149}$",
    },

    icon: {
        type: ["string", "null"],
        nullable: true,
        maxLength: 80,
        pattern: "^[a-zA-Z0-9_-]{1,80}$",
    },

    status: {
        type: "string",
        enum: Object.values(ModuleStatus),
    },
    sortOrder: {
        type: "integer",
        minimum: 0,
        maximum: 2147483647,
    },

    settings: settingsSchema,
};


export const createModuleSchema: AnySchema = {
    type: "object",
    additionalProperties: false,
    required: ["name","routeKey"],
    properties: moduleProperties,
};

export const updateModuleSchema: AnySchema = {
    type: "object",
    additionalProperties: false,
    minProperties: 1,
    properties: {
        name: moduleProperties.name,
        description: moduleProperties.description,
        icon: moduleProperties.icon,
        status: moduleProperties.status,
        sortOrder: moduleProperties.sortOrder,
        routeKey: moduleProperties.routeKey,
        settings: moduleProperties.settings,
    },
};
