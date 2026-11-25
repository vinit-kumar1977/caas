import { PaginationMetaInterface } from "./query.schemas.js";

export interface MetaDataInterface {
    requestId: string;
    timestamp: string;
    apiVersion?: string;
    productId: string;
    startedAt: number;
    tenantId?: string | null;
}

export interface ErrorDetailsInterface {
    code?: string;
    message?: string;
    field?: string;
    details?: unknown;
}

export interface SuccessResponseInterface<T = unknown> {
    statusCode: number;
    message?: string;
    data?: any;
    variable?: string;
    pagination?: PaginationMetaInterface;
}

export interface ErrorResponseInterface {
    statusCode: number;
    message?: string;
    errors?: ErrorDetailsInterface | null;
}
