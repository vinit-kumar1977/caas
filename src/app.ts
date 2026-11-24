import express from "express";
import router from "./routes/index.routes.js";
import { notFoundMiddleware } from "./common/middlewares/not-found.middlewares.js";
import { errorHandler } from "./common/errors/error-handler.errors.js";
import { requestMetaMiddleware } from "./common/middlewares/request-meta.middlewares.js";
import envConfigurations from "./configs/env.configs.js";
import swaggerRouter from "./configs/swagger/swagger.setup.js";
const app = express();

app.use(express.json());
app.use(requestMetaMiddleware);
if (envConfigurations.APP_ENV !== "production") {
    app.use("/api-docs", swaggerRouter);
}
app.use('/api',router);
app.use(notFoundMiddleware);
app.use(errorHandler);

export default app