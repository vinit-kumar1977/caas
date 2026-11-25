import { AppError } from "../../../common/errors/app.errors.js";
import { handleServiceError } from "../../../common/errors/service-error-handler.errors.js";
import { FullQueryInterface } from "../../../common/schemas/query.schemas.js";
import { validateEnum } from "../../../common/utils/enum-validator.utils.js";
import { AppDataSource } from "../../../infrastructures/database/data-source.database.js";
import { Product } from "../entities/product.entities.js";
import { ProductStatus } from "../enums/product-status.enums.js";
import { productRepository, ProductRepository } from "../repositories/product.repositories.js";
import { ICreateProduct, IUpdateProduct } from "../validations/product.validations.js";

export class ProductService {
  constructor(private readonly repo: ProductRepository = productRepository) { }
  async create(productData: ICreateProduct): Promise<Product> {
    try {
      return await AppDataSource.transaction(async () => {
        const existingProduct = await this.repo.findProductByCode(productData.code);
        if (existingProduct) throw new AppError("Product code already exists.", 409);
        if (productData.status) validateEnum(productData.status, ProductStatus, "status");

        const product = this.repo.create(
          {
            code: productData.code.trim(),
            name: productData.name,
            description: productData.description ?? null,
            logo: productData.logo,
            status: productData.status,
            isPublic: productData.isPublic,
            settings: productData.settings,
          },
        );
        return await this.repo.save(product);
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async getAllProducts(query: FullQueryInterface): Promise<any> {
    try {
      return this.repo.findAllProducts(query);
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async getAllProductsList(query: FullQueryInterface): Promise<any> {
    try {
      return this.repo.findAllProductsList(query);
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async getProductDetail(id: string): Promise<any> {
    try {
        const product = await this.repo.findProductById(id);
        if (!product) throw new AppError("Product not found.", 409);
        return product
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async update(productData: IUpdateProduct, id: string): Promise<Product> {
    try {
      return await AppDataSource.transaction(async () => {
        const product = await this.repo.findProductById(id);
        if (!product) throw new AppError("Product not found.", 409);
        if (productData.status) validateEnum(productData.status, ProductStatus, "status");

        product.name = productData.name || product.name;
        product.status = productData.status || product.status;
        product.logo = productData.logo || '';
        product.isPublic = productData.isPublic || product.isPublic;
        product.settings = productData.settings || product.settings;
        product.description = productData.description || '';

        return await this.repo.save(product);
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async delete(id: string): Promise<any> {
    try {
        const product = await this.repo.findProductById(id);
        if (!product) throw new AppError("Product not found.", 409);
        return await this.repo.delete(id);
    } catch (error) {
      throw handleServiceError(error);
    }
  }
}

export const productService = new ProductService();