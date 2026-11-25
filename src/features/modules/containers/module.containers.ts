import { ModuleController } from "../controllers/module.controllers.js";
import { ModuleRepository } from "../repositories/module.repositories.js";
import { ModuleService } from "../services/module.services.js";

export function createModuleContainer() {

    const repository = new ModuleRepository();
    const service = new ModuleService(repository);
    const controller = new ModuleController(service);

    return {
        controller,
    };
}