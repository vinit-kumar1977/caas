import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../src/app.js";

describe("Health endpoint contract", () => {
  it("preserves the public health response shape", async () => {
    const response = await request(app).get("/api/health");

    expect(Object.keys(response.body).sort()).toEqual([
      "environment",
      "message",
      "status",
      "success",
      "timestamp",
    ]);
    expect(typeof response.body.timestamp).toBe("string");
  });

  it("preserves the not-found error contract", async () => {
    const response = await request(app).get("/api/unknown");

    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: "ROUTE_NOT_FOUND",
      },
    });
  });
});
