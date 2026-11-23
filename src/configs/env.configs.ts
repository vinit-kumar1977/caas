const envConfigurations = {
    APP_PORT: process.env.APP_PORT,
    APP_ENV: process.env.APP_ENV,

    /* Database Configurations */
    DB_TYPE: process.env.DB_TYPE || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || "caas_db",
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASS: process.env.DB_PASS || "",
    DB_POOL_MIN: process.env.DB_POOL_MIN,
    DB_POOL_MAX: process.env.DB_POOL_MAX,
    DB_CONNECTION_TIMEOUT: process.env.DB_CONNECTION_TIMEOUT,
    DB_IDLE_TIMEOUT: process.env.DB_IDLE_TIMEOUT,
    DB_STATEMENT_TIMEOUT: process.env.DB_STATEMENT_TIMEOUT,
    DB_QUERY_TIMEOUT: process.env.DB_QUERY_TIMEOUT,

    /* Redis Configurations */
    REDIS_ENABLED: process.env.REDIS_ENABLED,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_DB: process.env.REDIS_DB,
    REDIS_TLS: process.env.REDIS_TLS,

    /* JWT Configurations */
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    JWT_ISSUER: process.env.JWT_ISSUER,
    JWT_AUDIENCE: process.env.JWT_AUDIENCE,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,

    /* Password Configurations */
    PASSWORD_HASH_ALGORITHM: process.env.PASSWORD_HASH_ALGORITHM,
    PASSWORD_HASH_MEMORY_COST: process.env.PASSWORD_HASH_MEMORY_COST,
    PASSWORD_HASH_TIME_COST: process.env.PASSWORD_HASH_TIME_COST,
    PASSWORD_HASH_PARALLELISM: process.env.PASSWORD_HASH_PARALLELISM,

    /* Security */
    CORS_ORIGINS: process.env.CORS_ORIGINS || "",
    TRUST_PROXY: process.env.TRUST_PROXY,
    RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED,
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
    LOGIN_MAX_ATTEMPTS: process.env.LOGIN_MAX_ATTEMPTS,
    LOGIN_LOCK_DURATION: process.env.LOGIN_LOCK_DURATION,

    /* Kafka */
    KAFKA_ENABLED: process.env.KAFKA_ENABLED,
    KAFKA_BROKERS: process.env.KAFKA_BROKERS,
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
    KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID,

    /* Queue */
    QUEUE_ENABLED: process.env.QUEUE_ENABLED,
    QUEUE_CONCURRENCY: process.env.QUEUE_CONCURRENCY,
    QUEUE_MAX_ATTEMPTS: process.env.QUEUE_MAX_ATTEMPTS,
    QUEUE_BACKOFF_DELAY: process.env.QUEUE_BACKOFF_DELAY,

    /* Email */
    SMTP_ENABLED: process.env.SMTP_ENABLED,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,

    /* File Upload */
    UPLOAD_MAX_FILE_SIZE: process.env.UPLOAD_MAX_FILE_SIZE,
    UPLOAD_MAX_FILES: process.env.UPLOAD_MAX_FILES,

    /* Logging */
    LOG_LEVEL: process.env.LOG_LEVEL,
    LOG_PRETTY: process.env.LOG_PRETTY,
    LOG_REQUEST_ID: process.env.LOG_REQUEST_ID,
}

export default envConfigurations