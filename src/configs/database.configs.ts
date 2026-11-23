import envConfigurations from "./env.configs.js"

const isProduction = envConfigurations.APP_ENV === "production";

const databaseConfigs = {
    type: "postgres" as const,
    host: envConfigurations.DB_HOST,
    port: Number(envConfigurations.DB_PORT),
    username: envConfigurations.DB_USER,
    password: envConfigurations.DB_PASS,
    database: envConfigurations.DB_NAME,
    ssl: isProduction ? { rejectUnauthorized: true } : false,
    synchronize: !isProduction,
    logging: isProduction,
    entities: isProduction
        ? ["dist/features/**/entities/**/*.entities.js"]
        : ["src/features/**/entities/**/*.entities.{ts,js}"],
        
    migrations: isProduction
        ? ["dist/database/migrations/*.js"]
        : ["src/database/migrations/*.ts"],

    extra: {
        min: envConfigurations.DB_POOL_MIN,
        max: envConfigurations.DB_POOL_MAX,
        connectionTimeoutMillis: envConfigurations.DB_CONNECTION_TIMEOUT,
        idleTimeoutMillis: envConfigurations.DB_IDLE_TIMEOUT,
        statement_timeout: envConfigurations.DB_STATEMENT_TIMEOUT,
        query_timeout: envConfigurations.DB_QUERY_TIMEOUT,
    },
}

export default databaseConfigs