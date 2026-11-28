import { ProductModuleController } from "../controllers/product-module.controllers.js";
import { ProductModuleRepository } from "../repositories/product-module.repositories.js";
import { ProducModuletService } from "../services/product-module.services.js";

export function createProductModuleContainer() {

    const repository = new ProductModuleRepository();
    const service = new ProducModuletService(repository);
    const productModuleController = new ProductModuleController(service);

    return {
        productModuleController,
    };
}