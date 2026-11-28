import { AppError } from "../../../common/errors/app.errors.js";
import { handleServiceError } from "../../../common/errors/service-error-handler.errors.js";
import { AppDataSource } from "../../../infrastructures/database/data-source.database.js";
import { productModuleRepository, ProductModuleRepository } from "../repositories/product-module.repositories.js";
import { productRepository, ProductRepository } from "../repositories/product.repositories.js";
import { ICreateProductModule, IUpdateProductModule } from "../validations/product-module.validations.js";

export class ProducModuletService {
  constructor(
    private readonly repo: ProductModuleRepository = productModuleRepository,
    private readonly productRepo: ProductRepository = productRepository
  ) { }
  async createProductModule(id: string, moduleIds: ICreateProductModule): Promise<any> {
    try {
      return await AppDataSource.transaction(async () => {
        /* validate product */
        const product = await this.productRepo.findProductById(id);
        if (!product) throw new AppError("Product not found.", 404);
        /* validate modules */
        const modules = await this.repo.findActiveModuleByIds(moduleIds.moduleIds);
        if (modules.length !== moduleIds.moduleIds.length) {
          throw new AppError("One or more module IDs are invalid or inactive.",400);
        }

        const productModules = modules.map((module, index) =>
          this.repo.create({
            product,
            product_id: product.id,
            module,
            module_id: module.id,
            sortOrder: index + 1,
          }),
        );
        return await this.repo.save(productModules);
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async getProductModule(id: string): Promise<any> {
    try {
      const product = await this.productRepo.findProductById(id);
      if (!product) throw new AppError("Product not found.", 409);
      const productModules = await this.repo.findModulesByProductId(id);
      return productModules;
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async updateProducyModule(id: string, moduleIds: IUpdateProductModule): Promise<any> {
    try {
      return await AppDataSource.transaction(async () => {
        /* validate product */
        const product = await this.productRepo.findProductById(id);
        if (!product) throw new AppError("Product not found.", 404);
        
        if (moduleIds.moduleIds?.length === 0) return await this.repo.deleteModulesByProductId(id);
        /* validate modules */
        const modules = await this.repo.findActiveModuleByIds(moduleIds.moduleIds);
        if (modules.length !== moduleIds.moduleIds.length) throw new AppError("One or more module IDs are invalid or inactive.",400);
        await this.repo.deleteModulesByProductId(id);

        const productModules = modules.map((module, index) =>
          this.repo.create({
            product,
            product_id: product.id,
            module,
            module_id: module.id,
            sortOrder: index + 1,
          }),
        );
        return await this.repo.save(productModules);
      });
    } catch (error) {
      throw handleServiceError(error)
    }
  }

}

export const productModuleService = new ProducModuletService();