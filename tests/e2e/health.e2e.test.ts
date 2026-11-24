import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../src/app.js";

describe("Service end-to-end health", () => {
  it("returns service health", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      status: "healthy",
      message: "Service is running successfully",
    });
  });

  it("returns a 404 for unknown routes", async () => {
    const response = await request(app).get("/api/not-a-real-route");

    expect(response.status).toBe(404);
  });
});
