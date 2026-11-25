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
    settings?: ModuleSettingsInterface;
}

export interface IUpdateModule {
    name: string;
    description?: string | null;
    routeKey?: string;
    icon?: string | null;
    status?: ModuleStatus;
    settings?: ModuleSettingsInterface;
}

const moduleProperties = {
    name: {
        type: "string",
        minLength: 2,
        maxLength: 150,
    },

    description: {
        type: ["string", "null"],
        maxLength: 5000,
    },

    routeKey: {
        type: "string",
        minLength: 1,
        maxLength: 150,
        pattern: "^[a-zA-Z0-9/_-]+$",
    },

    icon: {
        type: ["string", "null"],
        maxLength: 80,
    },

    status: {
        type: "string",
        enum: Object.values(ModuleStatus),
    },

    settings: {
        type: "object",
        additionalProperties: true,
    },
};


export const createModuleSchema: AnySchema = {
    type: "object",

    additionalProperties: false,

    required: [
        "name",
        "routeKey",
    ],

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
        routeKey: moduleProperties.routeKey,
        settings: moduleProperties.settings,
    },
};
