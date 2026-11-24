import { AppError } from "../../../common/errors/app.errors.js";
import { handleServiceError } from "../../../common/errors/service-error-handler.errors.js";
import { validateEnum } from "../../../common/utils/enum-validator.utils.js";
import { AppDataSource } from "../../../infrastructures/database/data-source.database.js";
import { Product } from "../entities/product.entities.js";
import { ProductStatus } from "../enums/product-status.enums.js";
import { productRepository, ProductRepository } from "../repositories/product.repositories.js";
import { ICreateProduct } from "../schemas/product.schemas.js";

export class ProductService {
  constructor(private readonly repo: ProductRepository = productRepository) {}
async create(productData: ICreateProduct): Promise<Product> {
  try {
    return await AppDataSource.transaction(async (manager) => {
      const existingProduct = await this.repo.findByCode(productData.code,manager);
      if (existingProduct) throw new AppError("Product code already exists.",409);
      if(productData.status) validateEnum(productData.status,ProductStatus,"status");

      const product = this.repo.create(
        {
          code: productData.code,
          name: productData.name,
          description: productData.description ?? null,
          logo: productData.logo,
          status: productData.status,
          isPublic: productData.isPublic,
          settings: productData.settings,
        },
        manager,
      );

      return await this.repo.save(product, manager);
    });
  } catch (error) {
    throw handleServiceError(error);
  }

  }
  
}

export const productService = new ProductService();