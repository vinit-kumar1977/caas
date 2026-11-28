import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppError } from "../../src/common/errors/app.errors.js";
import type { ProductRepository } from "../../src/features/products/repositories/product.repositories.js";
import { ProductStatus } from "../../src/features/products/enums/product-status.enums.js";
import { Product } from "../../src/features/products/entities/product.entities.js";
import { ProductService } from "../../src/features/products/services/product.services.js";
import { ProductFactory } from "../factories/product.factory.js";

const mocks = vi.hoisted(() => ({
  transaction: vi.fn(),
}));

vi.mock("../../src/infrastructures/database/data-source.database.js", () => ({
  AppDataSource: {
    transaction: mocks.transaction,
  },
}));

describe("ProductService", () => {
  const manager = {} as never;
  let repository: {
    findProductByCode: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    repository = {
      findProductByCode: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      save: vi.fn(),
    };
    mocks.transaction.mockImplementation(
      async (callback: (transactionManager: never) => Promise<unknown>) =>
        callback(manager),
    );
  });

  it("creates a product", async () => {
    const input = ProductFactory.create();
    const product = Object.assign(new Product(), input);
    repository.create.mockReturnValue(product);
    repository.save.mockResolvedValue(product);

    const service = new ProductService(repository as unknown as ProductRepository);
    await expect(service.create(input)).resolves.toBe(product);

    expect(repository.findProductByCode).toHaveBeenCalledWith(input.code);
    expect(repository.save).toHaveBeenCalledWith(product);
  });

  it("rejects duplicate product codes", async () => {
    repository.findProductByCode.mockResolvedValue(new Product());

    const service = new ProductService(repository as unknown as ProductRepository);
    await expect(service.create(ProductFactory.create())).rejects.toMatchObject({
      statusCode: 409,
      message: "Product code already exists.",
    });
  });

  it("rejects invalid status values", async () => {
    const input = ProductFactory.create({
      status: "invalid" as ProductStatus,
    });

    const service = new ProductService(repository as unknown as ProductRepository);
    await expect(service.create(input)).rejects.toBeInstanceOf(AppError);
  });
});
