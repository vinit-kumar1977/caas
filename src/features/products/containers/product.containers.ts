import { ProductController } from "../controllers/product.controllers.js";
import { ProductRepository } from "../repositories/product.repositories.js";
import { ProductService } from "../services/product.services.js";

export function createProductContainer() {

    const repository = new ProductRepository();
    const service = new ProductService(repository);
    const controller = new ProductController(service);

    return {
        controller,
    };
}