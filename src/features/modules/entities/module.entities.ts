
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from "typeorm";
import { AuditEntity } from "../../../common/entities/audit.entities.js";
import { ProductModule } from "../../products/entities/product-module.entities.js";

@Entity("modules")
export class Module extends AuditEntity {

    @Column({ type: "varchar", length: 150 })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string | null;

    @Column({ type: "varchar", name: "route_key", length: 150 })
    routeKey: string;

    @Column({ type: "varchar", length: 80, nullable: true })
    icon: string | null;

    @Column({
        type: "varchar",
        default: "active",
    })
    status: string;

    @Column({ name: "sort_order", type: "integer", default: 0 })
    sortOrder: number;

    @Column({ type: "jsonb", default: () => "'{}'::jsonb" })
    settings: Record<string, unknown>;

    @OneToMany(() => ProductModule, (item) => item.module)
    productModules: Relation<ProductModule[]>;
}
