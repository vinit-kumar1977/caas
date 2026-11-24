import { Product } from "../entities/product.entities.js";
import { productRepository, ProductRepository } from "../repositories/product.repositories.js";
import { ICreateProduct } from "../schemas/product.schemas.js";

export class ProductService {
  constructor(private readonly repo: ProductRepository = productRepository) {}
async create(productData: ICreateProduct): Promise<any> {
    try {
    //   return await AppDataSource.transaction(async (transaction: EntityManager) => {
    //     const codeUnique = await this.repo.findByCode(productData.code, transaction);
    //     if (codeUnique) throw new AppError(409, "Product code already exists");

    //     validateEnumField(ProductStatus, productData.status);

    //     const product = this.repo.create({
    //       code: productData.code,
    //       name: productData.name,
    //       description: productData.description ?? null,
    //       status: (productData.status as ProductStatus) || ProductStatus.ACTIVE,
    //       settings: productData.settings || {},
    //     } as DeepPartial<Product>, transaction);

    //     return await this.repo.save(product, transaction);
    //   });
    } catch (error) {
// return handleServiceError(error)  
  }
  }
  
}

export const productService = new ProductService();