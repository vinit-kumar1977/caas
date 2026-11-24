
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "CAAS Backend API",
            version: "1.0.0",
            description: "Centralized API documentation for CAAS platform.",
        },

        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Development Server",
            },
            {
                url: "https://api.example.com/api/v1",
                description: "Production Server",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your access token",
                },
            },

            schemas: {
                ApiError: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        statusCode: { type: "integer", example: 400 },
                        error: {
                            type: "object",
                            properties: {
                                code: {
                                    type: "string",
                                    example: "VALIDATION_ERROR",
                                },
                                message: {
                                    type: "string",
                                    example: "Invalid request data.",
                                },
                            },
                        },
                        timestamp: {
                            type: "string",
                            format: "date-time",
                        },
                        path: {
                            type: "string",
                            example: "/api/v1/products",
                        },
                    },
                },
            },
        },
    },

    // Scan feature route files for OpenAPI comments.
    apis: ["src/features/**/*.routes.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
