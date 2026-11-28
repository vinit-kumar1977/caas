import { describe, expect, it } from "vitest";
import ajv from "../../src/common/middlewares/validations/ajv.validations.js";
import { createProductSchema } from "../../src/features/products/validations/product.validations.js";
import { ProductFactory } from "../factories/product.factory.js";

describe("Product schema performance", () => {
  it("validates 5,000 payloads within a practical threshold", () => {
    const validate = ajv.compile(createProductSchema);
    const payload = ProductFactory.create();
    const startedAt = performance.now();

    for (let index = 0; index < 5_000; index += 1) {
      expect(validate(payload)).toBe(true);
    }

    expect(performance.now() - startedAt).toBeLessThan(2_000);
  });
});
