import { AppError } from "../../../common/errors/app.errors.js";
import { handleServiceError } from "../../../common/errors/service-error-handler.errors.js";
import { FullQueryInterface } from "../../../common/schemas/query.schemas.js";
import { validateEnum } from "../../../common/utils/enum-validator.utils.js";
import { AppDataSource } from "../../../infrastructures/database/data-source.database.js";
import { Module } from "../entities/module.entities.js";
import { ModuleStatus } from "../enums/module.enums.js";
import { moduleRepository, ModuleRepository } from "../repositories/module.repositories.js";
import { ICreateModule, IUpdateModule } from "../validations/module.validations.js";

export class ModuleService {
  constructor(private readonly repo: ModuleRepository = moduleRepository) { }
  async createModule(moduleData: ICreateModule): Promise<Module> {
    try {
      return await AppDataSource.transaction(async () => {
        const existingModuleRouteKey = await this.repo.findModuleByRouteKey(moduleData.routeKey);
        if(existingModuleRouteKey) throw new AppError("Route key already exists.", 409);
        if (moduleData.status) validateEnum(moduleData.status, ModuleStatus, "status");

        const module = this.repo.create(
          {
            name: moduleData.name,
            description: moduleData.description ?? null,
            icon: moduleData.icon,
            status: moduleData.status,
            routeKey: moduleData.routeKey,
            settings: moduleData.settings,
          },
        );
        return await this.repo.save(module);
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async getAllModules(query: FullQueryInterface): Promise<any> {
    try {
      return this.repo.findAllModules(query);
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async getAllProductsList(query: FullQueryInterface): Promise<any> {
    try {
      return this.repo.findAllModulesList(query);
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async getModuleById(id: string): Promise<Module> {
    try {
        const module = await this.repo.findModuleById(id);
        if (!module) throw new AppError("Module not found.", 409);
        return module;
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async update(moduleData: IUpdateModule, id: string): Promise<Module> {
    try {
      return await AppDataSource.transaction(async (manager) => {
        const module = await this.repo.findModuleById(id);
        if (!module) throw new AppError("Module not found.", 409);
        if (moduleData.status) validateEnum(moduleData.status, ModuleStatus, "status");

        module.name = moduleData.name || module.name;
        module.status = moduleData.status || module.status;
        module.icon = moduleData.icon || '';
        module.settings = moduleData.settings || module.settings;
        module.description = moduleData.description || '';

        return await this.repo.save(module);
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async delete(id: string): Promise<any> {
    try {
        const product = await this.repo.findModuleById(id);
        if (!product) throw new AppError("Product not found.", 409);
        return await this.repo.delete(id);
    } catch (error) {
      throw handleServiceError(error);
    }
  }
}

export const moduleService = new ModuleService();