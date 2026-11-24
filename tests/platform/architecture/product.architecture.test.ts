import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Product architecture", () => {
  it("keeps HTTP controllers independent of repositories", () => {
    const controller = readFileSync(
      "src/features/products/controllers/product.controllers.ts",
      "utf8",
    );

    expect(controller).not.toContain("repositories/");
  });

  it("keeps services below controllers", () => {
    const service = readFileSync(
      "src/features/products/services/product.services.ts",
      "utf8",
    );

    expect(service).toContain("repositories/");
  });
});
