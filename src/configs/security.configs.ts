import envConfigurations from "./env.configs.js";

export const securityConfig = {
    cors: {
        origins: envConfigurations.CORS_ORIGINS
            .split(",")
            .map(origin => origin.trim())
            .filter(Boolean),

        credentials: true,
        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS",
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Request-ID",
        ],
        exposedHeaders: [
            "X-Request-ID",
            "RateLimit-Limit",
            "RateLimit-Remaining",
            "RateLimit-Reset",
        ],
        maxAge: 86400,
    },

    rateLimit: {
        enabled: envConfigurations.RATE_LIMIT_ENABLED,

        general: {
            windowMs: envConfigurations.RATE_LIMIT_WINDOW_MS,
            max: envConfigurations.RATE_LIMIT_MAX_REQUESTS,
        },

        auth: {
            windowMs: envConfigurations.RATE_LIMIT_WINDOW_MS,
            max: 10,
        },

        login: {
            windowMs: 15 * 60 * 1000,
            max: 5,
        },

        register: {
            windowMs: 60 * 60 * 1000,
            max: 10,
        },

        passwordReset: {
            windowMs: 60 * 60 * 1000,
            max: 5,
        },

        refreshToken: {
            windowMs: 60 * 1000,
            max: 30,
        },
    },
} as const;
