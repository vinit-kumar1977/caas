
// import {
//     rateLimit,
//     ipKeyGenerator,
// } from "express-rate-limit";

// import type { Request } from "express";

// import { RedisStore } from "rate-limit-redis";
// import { securityConfig } from "../../configs/security.configs.js";

// // Normalize IP-based keys.
// // ipKeyGenerator handles IPv6 subnet normalization.
// const getClientKey = (req: Request): string => {
//     return ipKeyGenerator(req.ip || "unknown");
// };

// // Redis store factory
// const createRedisStore = (prefix: string) => {
//     if (!redisConnection) {
//         return undefined;
//     }

//     return new RedisStore({
//         prefix,
//         sendCommand: (...args: string[]) =>
//             redisConnection.call(...args) as Promise<any>,
//     });
// };

// // General rate limiter
// export const generalRateLimiter = rateLimit({
//     windowMs: securityConfig.rateLimit.general.windowMs,

//     limit: securityConfig.rateLimit.general.max,

//     standardHeaders: "draft-8",

//     legacyHeaders: false,

//     store: createRedisStore("caas:rl:general:"),

//     keyGenerator: getClientKey,

//     skip: () => !securityConfig.rateLimit.enabled,

//     message: {
//         success: false,
//         code: "RATE_LIMIT_EXCEEDED",
//         message: "Too many requests. Please try again later.",
//     },

//     handler: (_req, res) => {
//         res.status(429).json({
//             success: false,
//             code: "RATE_LIMIT_EXCEEDED",
//             message: "Too many requests. Please try again later.",
//         });
//     },
// });

// // Authentication rate limiter
// export const authRateLimiter = rateLimit({
//     windowMs: securityConfig.rateLimit.auth.windowMs,

//     limit: securityConfig.rateLimit.auth.max,

//     standardHeaders: "draft-8",

//     legacyHeaders: false,

//     store: createRedisStore("caas:rl:auth:"),

//     keyGenerator: getClientKey,

//     skip: () => !securityConfig.rateLimit.enabled,

//     message: {
//         success: false,
//         code: "AUTH_RATE_LIMIT_EXCEEDED",
//         message: "Too many authentication requests. Please try again later.",
//     },

//     handler: (_req, res) => {
//         res.status(429).json({
//             success: false,
//             code: "AUTH_RATE_LIMIT_EXCEEDED",
//             message: "Too many authentication requests. Please try again later.",
//         });
//     },
// });

// // Login limiter
// export const loginRateLimiter = rateLimit({
//     windowMs: securityConfig.rateLimit.login.windowMs,

//     limit: securityConfig.rateLimit.login.max,

//     standardHeaders: "draft-8",

//     legacyHeaders: false,

//     store: createRedisStore("caas:rl:login:"),

//     keyGenerator: getClientKey,

//     skip: () => !securityConfig.rateLimit.enabled,

//     handler: (_req, res) => {
//         res.status(429).json({
//             success: false,
//             code: "LOGIN_RATE_LIMIT_EXCEEDED",
//             message: "Too many login attempts. Please try again later.",
//         });
//     },
// });

// // Registration limiter
// export const registerRateLimiter = rateLimit({
//     windowMs: securityConfig.rateLimit.register.windowMs,

//     limit: securityConfig.rateLimit.register.max,

//     standardHeaders: "draft-8",

//     legacyHeaders: false,

//     store: createRedisStore("caas:rl:register:"),

//     keyGenerator: getClientKey,

//     skip: () => !securityConfig.rateLimit.enabled,

//     handler: (_req, res) => {
//         res.status(429).json({
//             success: false,
//             code: "REGISTER_RATE_LIMIT_EXCEEDED",
//             message: "Too many registration attempts. Please try again later.",
//         });
//     },
// });

// // Password reset limiter
// export const passwordResetRateLimiter = rateLimit({
//     windowMs: securityConfig.rateLimit.passwordReset.windowMs,

//     limit: securityConfig.rateLimit.passwordReset.max,

//     standardHeaders: "draft-8",

//     legacyHeaders: false,

//     store: createRedisStore("caas:rl:password-reset:"),

//     keyGenerator: getClientKey,

//     skip: () => !securityConfig.rateLimit.enabled,

//     handler: (_req, res) => {
//         res.status(429).json({
//             success: false,
//             code: "PASSWORD_RESET_RATE_LIMIT_EXCEEDED",
//             message: "Too many password reset requests. Please try again later.",
//         });
//     },
// });

// // Refresh token limiter
// export const refreshTokenRateLimiter = rateLimit({
//     windowMs: securityConfig.rateLimit.refreshToken.windowMs,

//     limit: securityConfig.rateLimit.refreshToken.max,

//     standardHeaders: "draft-8",

//     legacyHeaders: false,

//     store: createRedisStore("caas:rl:refresh:"),

//     keyGenerator: getClientKey,

//     skip: () => !securityConfig.rateLimit.enabled,

//     handler: (_req, res) => {
//         res.status(429).json({
//             success: false,
//             code: "REFRESH_RATE_LIMIT_EXCEEDED",
//             message: "Too many refres    h requests. Please try again later.",
//         });
//     },
// });
