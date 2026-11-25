import { DeepPartial, EntityManager, IsNull, Not, Repository } from "typeorm";
import { AppDataSource } from "../../../infrastructures/database/data-source.database.js";
import { FullQueryInterface } from "../../../common/schemas/query.schemas.js";
import { applySearchSortFilters, paginateQuery } from "../../../common/utils/query.utils.js";
import { Module } from "../entities/module.entities.js";
import { MODULE_QUERY_POLICY } from "../configs/module.configs.js";

export class ModuleRepository {

    private getRepo(): Repository<Module> {
        return AppDataSource.getRepository(Module);
    }

    findModuleByRouteKey(routeKey:string){
        return this.getRepo().findOneBy({routeKey,deletedAt:IsNull()});
    }

    findModuleByRouteKeyExcludeId(routeKey:string,id:string){
        return this.getRepo().findOneBy({routeKey,id:Not(id),deletedAt:IsNull()});
    }

    findModuleById(id: string) {
        return this.getRepo().findOneBy({ id, deletedAt: IsNull() });
    }

    findAllModules(query: FullQueryInterface) {
        const repository = AppDataSource.getRepository(Module);
        const qb = repository
            .createQueryBuilder("m")
            .where("m.deletedAt IS NULL")
        applySearchSortFilters(
            qb,
            "m",
            query,
            MODULE_QUERY_POLICY,
        );
        return paginateQuery(
            qb,
            query,
            MODULE_QUERY_POLICY,
        );
    }

    findAllModulesList(query: FullQueryInterface) {
        const repository = AppDataSource.getRepository(Module);
        const qb = repository
            .createQueryBuilder("m")
            .where("m.deletedAt IS NULL")
            .andWhere("m.status = :status", { status: "active" })
            .select(["m.id", "m.name", "m.code", "m.icon"])
        applySearchSortFilters(
            qb,
            "m",
            query,
            MODULE_QUERY_POLICY,
        );
        return paginateQuery(
            qb,
            query,
            MODULE_QUERY_POLICY,
        );
    }

    create(data: DeepPartial<Module>): Module {
        return this.getRepo().create(data);
    }

    save(module: Module) {
        return this.getRepo().save(module);
    }

    delete(id: string) {
        return this.getRepo().softDelete(id);
    }
}

export const moduleRepository = new ModuleRepository();