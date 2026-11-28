
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
    OneToMany,
    Relation,
    Check,
} from "typeorm";

import { AuditEntity } from "../../../common/entities/audit.entities.js";
import { Product } from "../../products/entities/product.entities.js";
import { PlanModule } from "./plan-module.entities.js";

@Entity("plans")

@Index("UQ_PLAN_PRODUCT_CODE", ["productId", "code"], {
    unique: true,
})

@Index("IDX_PLAN_PRODUCT_STATUS", ["productId", "status"])

@Index("IDX_PLAN_PRODUCT_TYPE", ["productId", "planType"])

@Check(
    "CK_PLAN_CODE",
    `"code" ~ '^[A-Z][A-Z0-9_-]{1,79}$'`
)

@Check(
    "CK_PLAN_NAME",
    `"name" = BTRIM("name") AND LENGTH("name") >= 2`
)

@Check(
    "CK_PLAN_DESCRIPTION_LENGTH",
    `"description" IS NULL OR LENGTH("description") <= 2000`
)

@Check(
    "CK_PLAN_FEATURES_OBJECT",
    `JSONB_TYPEOF("features") = 'object'`
)

@Check(
    "CK_PLAN_FEATURES_SIZE",
    `OCTET_LENGTH("features"::TEXT) <= 65536`
)

export class Plan extends AuditEntity {

    @Column({
        name: "product_id",
        type: "uuid",
    })
    productId: string;

    @ManyToOne(() => Product, (product) => product.plans, {
        nullable: false,
        onDelete: "RESTRICT",
    })
    @JoinColumn({
        name: "product_id",
        referencedColumnName: "id",
    })
    product: Relation<Product>;

    @Column({
        type: "varchar",
        length: 80,
    })
    code: string;

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
        type: "jsonb",
        default: () => "'{}'::jsonb",
    })
    features: Record<string, unknown>;

    @Column({
        type: "varchar",
        default: "active",
    })
    status: string;

    @Column({
        name: "plan_type",
        type: "varchar",
        default: "basic",
    })
    planType: string;

    @OneToMany(() => PlanModule, (item) => item.plan)
    planModules: Relation<PlanModule[]>;
}
