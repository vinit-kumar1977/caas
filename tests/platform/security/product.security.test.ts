import { describe, expect, it } from "vitest";
import { ajv } from "../../../src/common/middlewares/validations/ajv.validations.js";
import { createProductSchema } from "../../../src/features/products/schemas/product.schemas.js";
import { ProductFactory } from "../../factories/product.factory.js";

describe("Product security validation", () => {
  it("blocks prototype-pollution property names", () => {
    const validate = ajv.compile(createProductSchema);
    const payload = ProductFactory.create();
    const unsafe = {
      ...payload,
      settings: { constructor: "value" },
    };

    expect(validate(unsafe)).toBe(false);
  });

  it("blocks control characters in logos", () => {
    const validate = ajv.compile(createProductSchema);

    expect(validate(ProductFactory.create({ logo: "bad\u0000logo" }))).toBe(false);
  });
});
