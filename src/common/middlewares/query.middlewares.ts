import type {
    Request,
    Response,
    NextFunction,
} from "express";

import type { FullQueryInterface } from "../schemas/query.schemas.js";
import { parseFullQuery } from "../utils/query-parser.utils.js";

declare module "express-serve-static-core" {
    interface Request {
        fullQuery?: FullQueryInterface;
    }
}

export const queryMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction,
): void => {
    try {
        req.fullQuery = parseFullQuery(
            req.query as Record<string, unknown>,
        );

        next();
    } catch (error) {
        next(error);
    }
};