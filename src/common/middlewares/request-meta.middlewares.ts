import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export const requestMetaMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.locals.meta = {
    requestId: req.header("x-request-id") ?? crypto.randomUUID(),
    apiVersion: "v1",
    startedAt: Date.now(),
    timestamp: new Date().toISOString(),
    tenantId: req.headers["x-tenant-id"] ?? null,
    productId: crypto.randomUUID()
  };

  // Request-scoped audit context, read by ActivityService.record() so services
  // don't have to thread ip/browser/requestId through every method signature.
  // sessionId is filled in later by authenticateToken.
//   RequestContext.setActivityMeta({
//     ip: req.ip ?? null,
//     browser: getDeviceInfo(req).browser ?? null,
//     requestId: res.locals.meta.requestId,
//     sessionId: null,
//   });
  next();
};
