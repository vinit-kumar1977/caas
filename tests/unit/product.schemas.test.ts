import { describe, expect, it } from "vitest";
import ajv from "../../src/common/middlewares/validations/ajv.validations.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../src/features/products/validations/product.validations.js";
import { ProductFactory } from "../factories/product.factory.js";

describe("Product request schemas", () => {
  it("accepts a valid create request", () => {
    const validate = ajv.compile(createProductSchema);

    expect(validate(ProductFactory.create())).toBe(true);
  });

  it("rejects missing required fields", () => {
    const validate = ajv.compile(createProductSchema);

    expect(validate({ name: "Core" })).toBe(false);
  });

  it("rejects invalid product codes", () => {
    const validate = ajv.compile(createProductSchema);

    expect(validate(ProductFactory.create({ code: "Invalid-Code" }))).toBe(false);
  });

  it("rejects unknown settings fields", () => {
    const validate = ajv.compile(createProductSchema);
    const payload = ProductFactory.create({
      settings: { constructor: "blocked" },
    });

    expect(validate(payload)).toBe(false);
  });

  it("requires at least one field in an update", () => {
    const validate = ajv.compile(updateProductSchema);

    expect(validate({})).toBe(false);
  });
});
