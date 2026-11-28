import { In, IsNull, Repository } from "typeorm";
import { AppDataSource } from "../../../infrastructures/database/data-source.database.js";
import { ProductModule } from "../entities/product-module.entities.js";
import { Module } from "../../modules/entities/module.entities.js";

export class ProductModuleRepository {

  private getRepo(): Repository<ProductModule> {
    return AppDataSource.getRepository(ProductModule);
  }

  private getModuleRepo(): Repository<Module> {
    return AppDataSource.getRepository(Module);
  }

  findActiveModuleByIds(ids: string[]) {
    return this.getModuleRepo().find({
      where: {
        id: In(ids),
        status: "active",
        deletedAt: IsNull(),
      },
    });
  }

  create(productModule: any) {
    return this.getRepo().create(productModule);
  }

  save(data: any) {
    return this.getRepo().insert(data);
  }

  findModulesByProductId(id: string) {
    return this.getRepo()
      .createQueryBuilder("pm")
      .leftJoin("pm.module", "module")
      .select([
        "module.id",
        "module.name",
        "module.status",
      ])
      .where("pm.product_id = :id", { id })
      .andWhere("module.deletedAt IS NULL")
      .orderBy("pm.sortOrder", "ASC")
      .getMany();
  }

  deleteModulesByProductId(productId:string){
    return this.getRepo().delete({product_id: productId})
  }
}

export const productModuleRepository = new ProductModuleRepository();