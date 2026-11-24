import "reflect-metadata";
import { getMetadataArgsStorage } from "typeorm";
import { describe, expect, it } from "vitest";
import { Product } from "../../../src/features/products/entities/product.entities.js";

describe("Product database metadata", () => {
  it("defines the products table", () => {
    const storage = getMetadataArgsStorage();
    const table = storage.tables.find(
      (entry) => entry.target === Product,
    );

    expect(table?.name).toBe("products");
  });

  it("defines required entity columns", () => {
    const storage = getMetadataArgsStorage();
    const columns = storage.columns
      .filter((entry) => entry.target === Product)
      .map((entry) => entry.propertyName);

    expect(columns).toEqual(
      expect.arrayContaining([
        "name",
        "code",
        "description",
        "status",
        "isPublic",
        "settings",
      ]),
    );
  });
});
