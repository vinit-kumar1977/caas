
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
    OneToMany,
    Relation,
} from "typeorm";
import { AuditEntity } from "../../../common/entities/audit.entities.js";
import { Product } from "../../products/entities/product.entities.js";
import { PlanModule } from "./plan-module.entities.js";


@Entity("plans")
@Index("uq_plan_product_code", ["product", "code"], {
    unique: true,
})
export class Plan extends AuditEntity {
    @Column({ type: "uuid" })
    produc_id: string;

    @ManyToOne(() => Product, (product) => product.plans, {
        onDelete: "RESTRICT",
    })
    @JoinColumn({ name: "product_id", referencedColumnName: "id" })
    product: Product;

    @Column({ type: "varchar", length: 80 })
    code: string;

    @Column({ type: "varchar", length: 150 })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string | null;

    @Column({ type: "jsonb", default: () => "'{}'::jsonb" })
    features: Record<string, unknown>;

    @Column({
        type: "varchar",
        default: "active",
    })
    status: string;

    @OneToMany(() => PlanModule, (item) => item.plan)
    planModules:Relation<PlanModule[]>;
}
