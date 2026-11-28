import {
    Entity,
    Column,
    OneToMany,
    Relation,
    Check,
    Index,
} from "typeorm";

import { AuditEntity } from "../../../common/entities/audit.entities.js";
import { ProductModule } from "../../products/entities/product-module.entities.js";
import { ModuleFeature } from "./module-feature.entities.js";

@Entity("modules")

@Index("UQ_MODULE_ROUTE_KEY", ["routeKey"], { unique: true })
@Index("IDX_MODULE_STATUS", ["status"])
@Index("IDX_MODULE_SORT_ORDER", ["sortOrder"])

@Check(
    "CK_MODULE_NAME",
    `"name" = BTRIM("name") AND LENGTH("name") BETWEEN 2 AND 150`
)

@Check(
    "CK_MODULE_ROUTE_KEY",
    `"route_key" ~ '^[a-z][a-z0-9_-]{1,149}$'`
)

@Check(
    "CK_MODULE_SORT_ORDER",
    `"sort_order" >= 0`
)

@Check(
    "CK_MODULE_SETTINGS_OBJECT",
    `JSONB_TYPEOF("settings") = 'object'`
)

@Check(
    "CK_MODULE_ICON",
    `"icon" IS NULL OR "icon" ~ '^[a-zA-Z0-9_-]{1,80}$'`
)

@Check(
    "CK_MODULE_DESCRIPTION_LENGTH",
    `"description" IS NULL OR LENGTH("description") <= 2000`
)

@Check(
    "CK_MODULE_SETTINGS_SIZE",
    `OCTET_LENGTH("settings"::TEXT) <= 65536`
)

export class Module extends AuditEntity {

    @Column({
        type: "varchar",
        length: 150,
    })
    name: string;

    @Column({
        type: "text",
        nullable: true,
    })
    description: string | null;

    @Column({
        type: "varchar",
        name: "route_key",
        length: 150,
    })
    routeKey: string;

    @Column({
        type: "varchar",
        length: 80,
        nullable: true,
    })
    icon: string | null;

    @Column({
        type: "varchar",
        length: 20,
        default: "active",
    })
    status: string;

    @Column({
        name: "sort_order",
        type: "integer",
        default: 0,
    })
    sortOrder: number;

    @Column({
        type: "jsonb",
        default: () => "'{}'::jsonb",
    })
    settings: Record<string, unknown>;

    @OneToMany(
        () => ProductModule,
        (item) => item.module
    )
    productModules: Relation<ProductModule[]>;

    @OneToMany(
        () => ModuleFeature,
        (item) => item.module
    )
    moduleFeatures: Relation<ModuleFeature[]>;
}