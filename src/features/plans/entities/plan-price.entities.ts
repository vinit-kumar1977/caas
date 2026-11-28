import {
    Entity,
    Column,
    Index,
    ManyToOne,
    JoinColumn,
    Relation,
} from "typeorm";

import { Plan } from "./plan.entities.js";
import { AuditEntity } from "../../../common/entities/audit.entities.js";

@Entity("plan_prices")
@Index("IDX_PLAN_PRICE_PLAN", ["planId"])
@Index("IDX_PLAN_PRICE_STATUS", ["status"])
@Index("IDX_PLAN_PRICE_CURRENCY", ["currency"])

export class PlanPrice extends AuditEntity {
    @Column({
        name: "plan_id",
        type: "uuid",
    })
    planId: string;

    @ManyToOne(() => Plan, {
        onDelete: "RESTRICT",
    })
    @JoinColumn({
        name: "plan_id",
        referencedColumnName: "id",
    })
    plan: Relation<Plan>;

    @Column({
        type: "char",
        length: 3,
    })
    currency: string;

    @Column({
        name: "billing_interval",
        type: "varchar",
        default: "month"
    })
    billingInterval: string;

    @Column({
        name: "interval_count",
        type: "int",
        default: 1,
    })
    intervalCount: number;

    @Column({
        name: "base_price",
        type: "decimal",
        precision: 19,
        scale: 4,
    })
    basePrice: string;

    @Column({
        name: "setup_fee",
        type: "decimal",
        precision: 19,
        scale: 4,
        default: 0,
    })
    setupFee: string;

    @Column({
        name: "tax_inclusive",
        type: "boolean",
        default: false,
    })
    taxInclusive: boolean;

    @Column({
        type: "varchar",
        default: "draft"
    })
    status: string;
}