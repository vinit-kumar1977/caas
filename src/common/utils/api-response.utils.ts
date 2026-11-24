
import { Response } from "express";
import { getHttpStatus } from "../constants/http-status.constants.js";
import {
    ErrorResponseInterface,
    MetaDataInterface,
    SuccessResponseInterface,
} from "../schemas/api-response.schemas.js";

export class ApiResponse {
    static success(res: Response, options: SuccessResponseInterface): void {
        const meta = res.locals.meta as MetaDataInterface;

        res.status(options.statusCode).json({
            success: true,
            code: getHttpStatus(options.statusCode),
            message: options.message || "Success",
            data: options.data ?? null,
            meta: {
                requestId: meta.requestId,
                timestamp: meta.timestamp,
                apiVersion: meta.apiVersion,
                productId: meta.productId,
                duration: Date.now() - meta.startedAt,
                ...(meta.tenantId != null && { tenantId: meta.tenantId }),
                ...(options.pagination != null && {
                    pagination: options.pagination,
                }),
            },
        });
    }

    static error(res: Response, options: ErrorResponseInterface): void {
        const meta = res.locals.meta as MetaDataInterface;

        res.status(options.statusCode).json({
            success: false,
            code: getHttpStatus(options.statusCode),
            message: options.message || "Failed",
            data: null,
            error: options.errors ?? null,
            meta: {
                requestId: meta.requestId,
                timestamp: meta.timestamp,
                apiVersion: meta.apiVersion,
                productId: meta.productId,
                duration: Date.now() - meta.startedAt,
                ...(meta.tenantId != null && { tenantId: meta.tenantId }),
            },
        });
    }
}
