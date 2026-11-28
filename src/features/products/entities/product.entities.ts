import {
    Entity,
    Column,
    Index,
    OneToMany,
    Relation,
} from "typeorm";

import { AuditEntity } from "../../../common/entities/audit.entities.js";
import { ProductSettings } from "../validations/product.validations.js";
import { Plan } from "../../plans/entities/plan.entities.js";
import { ProductModule } from "./product-module.entities.js";

@Entity({ name: "products" })
@Index("uq_products_code", ["code"], { unique: true })
@Index("idx_products_status", ["status"])
@Index("idx_products_public_status", ["isPublic", "status"])

export class Product extends AuditEntity {

    @Column({
        type: "varchar",
        length: 100,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    code: string;

    @Column({
        type: "text",
        nullable: true,
    })
    description: string | null;

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,
    })
    logo: string | null;

    @Column({
        type: "varchar",
        length: 20,
        default: "active",
    })
    status: string;

    @Column({
        name: "is_public",
        type: "boolean",
        default: false,
    })
    isPublic: boolean;

    @Column({
        type: "jsonb",
        default: () => "'{}'::jsonb",
    })
    settings: ProductSettings;

    @OneToMany(() => ProductModule, (item) => item.module)
    productModules:Relation<ProductModule[]>;

    @OneToMany(() => Plan, (item) => item.product)
    plans: Relation<Plan[]>;
}