import { ProductStatus } from "../../src/features/products/enums/product-status.enums.js";
import type { ICreateProduct } from "../../src/features/products/schemas/product.schemas.js";

export function createProductFixture(
  overrides: Partial<ICreateProduct> = {},
): ICreateProduct {
  return {
    name: "Core Platform",
    code: "core_platform",
    description: "Primary product",
    logo: null,
    status: ProductStatus.ACTIVE,
    isPublic: true,
    settings: { billingEnabled: true },
    ...overrides,
  };
}
