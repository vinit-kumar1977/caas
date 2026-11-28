import { DeepPartial, IsNull, Not, Repository } from "typeorm";
import { Product } from "../entities/product.entities.js";
import { AppDataSource } from "../../../infrastructures/database/data-source.database.js";
import { FullQueryInterface } from "../../../common/schemas/query.schemas.js";
import { applySearchSortFilters, paginateQuery } from "../../../common/utils/query.utils.js";
import { PRODUCT_QUERY_POLICY } from "../configs/product.configs.js";

export class ProductRepository {

  private getRepo(): Repository<Product> {
    return AppDataSource.getRepository(Product);
  }

  findProductByCode(code: string) {
    return this.getRepo().findOneBy({ code, deletedAt: IsNull() });
  }

  findProductByCodeExcludeId(code: string, id: string) {
    return this.getRepo().findOneBy({ code, id: Not(id), deletedAt: IsNull() });
  }

  findProductById(id: string) {
    return this.getRepo().findOneBy({ id, deletedAt: IsNull() });
  }

  findAllProducts(query: FullQueryInterface) {
    const repository = AppDataSource.getRepository(Product);
    const qb = repository
      .createQueryBuilder("p")
      .where("p.deletedAt IS NULL")
    applySearchSortFilters(
      qb,
      "p",
      query,
      PRODUCT_QUERY_POLICY,
    );
    return paginateQuery(
      qb,
      query,
      PRODUCT_QUERY_POLICY,
    );
  }

  findAllProductsList(query: FullQueryInterface) {
    const repository = AppDataSource.getRepository(Product);
    const qb = repository
      .createQueryBuilder("p")
      .where("p.deletedAt IS NULL")
      .andWhere("p.status = :status", { status: "active" })
      .select(["p.id","p.name","p.code","p.logo"])
    applySearchSortFilters(
      qb,
      "p",
      query,
      PRODUCT_QUERY_POLICY,
    );
    return paginateQuery(
      qb,
      query,
      PRODUCT_QUERY_POLICY,
    );
  }

  createQueryBuilder(alias = "p") {
    return this.getRepo().createQueryBuilder(alias);
  }

  create(data: DeepPartial<Product>): Product {
    return this.getRepo().create(data);
  }

  save(product: Product) {
    return this.getRepo().save(product);
  }

  delete(id: string) {
    return this.getRepo().softDelete(id);
  }
}

export const productRepository = new ProductRepository();