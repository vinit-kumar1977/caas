import { DeepPartial, EntityManager, IsNull, Not, Repository } from "typeorm";
import { Product } from "../entities/product.entities.js";
import { AppDataSource } from "../../../infrastructures/database/data-source.database.js";

export class ProductRepository {
  private getRepo(manager?: EntityManager): Repository<Product> {
    return manager ? manager.getRepository(Product) : AppDataSource.getRepository(Product);
  }

  findByCode(code: string, manager?: EntityManager) {
    return this.getRepo(manager).findOne({ where: { code, deleted_at: IsNull() } });
  }

  findByCodeExcludingId(code: string, excludeId: string, manager?: EntityManager) {
    return this.getRepo(manager).findOne({ where: { code, id: Not(excludeId), deleted_at: IsNull() } });
  }

  findById(id: string, manager?: EntityManager) {
    return this.getRepo(manager).findOneBy({ id });
  }

  findByIdActive(id: string, manager?: EntityManager) {
    return this.getRepo(manager).findOne({ where: { id, deleted_at: IsNull() } });
  }

  createQueryBuilder(alias = "p", manager?: EntityManager) {
    return this.getRepo(manager).createQueryBuilder(alias);
  }

  create(data: DeepPartial<Product>, manager?: EntityManager): Product {
    return this.getRepo(manager).create(data);
  }

  save(product: Product, manager?: EntityManager) {
    return this.getRepo(manager).save(product);
  }

//   update(id: string, partial: Partial<Product>, manager?: EntityManager) {
//     return this.getRepo(manager).update(id, partial);
//   }

  softDelete(id: string, manager?: EntityManager) {
    return this.getRepo(manager).softDelete(id);
  }
}

export const productRepository = new ProductRepository();