import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { requestMetaMiddleware } from "../../src/common/middlewares/request-meta.middlewares.js";
import { errorHandler } from "../../src/common/errors/error-handler.errors.js";
import productRoutes from "../../src/features/products/routes/product.routes.js";

describe("Product HTTP integration", () => {
  function createApp() {
    const app = express();
    app.use(express.json());
    app.use(requestMetaMiddleware);
    app.use("/api/v1/products", productRoutes);
    app.use(errorHandler);
    return app;
  }

  it("rejects malformed create payloads", async () => {
    const response = await request(createApp())
      .post("/api/v1/products")
      .send({ name: "Core", code: "Invalid-Code" })
      .set("x-request-id", "integration-test");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects additional properties", async () => {
    const response = await request(createApp())
      .post("/api/v1/products")
      .send({
        name: "Core Platform",
        code: "core_platform",
        unexpected: true,
      });

    expect(response.status).toBe(400);
  });
});
