
import cors, { type CorsOptions } from "cors";
import { securityConfig } from "../../configs/security.configs.js";

const allowedOrigins = new Set(securityConfig.cors.origins);

const corsOptions: CorsOptions = {
    origin(origin, callback) {
        // Allow requests without Origin, such as server-to-server
        // and certain health-check requests.
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin))  return callback(null, true);
        return callback(
            new Error("Origin not allowed by CORS"),
            false
        );
    },
    credentials: securityConfig.cors.credentials,
    methods: [...securityConfig.cors.methods],
    allowedHeaders: [...securityConfig.cors.allowedHeaders],
    exposedHeaders: [...securityConfig.cors.exposedHeaders],
    maxAge: securityConfig.cors.maxAge,
    optionsSuccessStatus: 204,
};

export const corsMiddleware = cors(corsOptions);
