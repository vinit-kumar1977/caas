import { createProductFixture } from "../fixtures/product.fixtures.js";
import type { ICreateProduct } from "../../src/features/products/schemas/product.schemas.js";

export class ProductFactory {
  static create(overrides: Partial<ICreateProduct> = {}): ICreateProduct {
    return createProductFixture(overrides);
  }

  static createMany(
    count: number,
    overrides: Partial<ICreateProduct> = {},
  ): ICreateProduct[] {
    return Array.from({ length: count }, (_, index) =>
      createProductFixture({
        ...overrides,
        code: overrides.code ?? `product_${index + 1}`,
      }),
    );
  }
}
