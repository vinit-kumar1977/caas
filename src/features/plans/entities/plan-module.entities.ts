import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  Index,
  Check,
  Unique,
} from "typeorm";

import { TimestampEntity } from "../../../common/entities/time-stamp.entities.js";
import { Plan } from "./plan.entities.js";
import { ProductModule } from "../../products/entities/product-module.entities.js";

@Entity("plan_modules")

// Required: plan_module_features has a composite FK
// (plan_id, product_module_id) → plan_modules(plan_id, product_module_id).
// PostgreSQL only allows an FK to reference a PRIMARY KEY or UNIQUE constraint.
// Also prevents the same module being attached to the same plan twice.
@Unique("UQ_PLAN_MODULE_PLAN_PRODUCT_MODULE", ["planId", "productModuleId"])

@Index("IDX_PLAN_MODULE_PRODUCT_STATUS", ["productId", "status"])
@Index("IDX_PLAN_MODULE_PLAN_STATUS", ["planId", "status"])

@Check(
  "CK_PLAN_MODULE_STATUS",
  `"status" IN ('active', 'inactive', 'archived')`,
)

export class PlanModule extends TimestampEntity {

  @Column("uuid", { name: "plan_id" })
  planId: string;

  @Column("uuid", { name: "product_module_id" })
  productModuleId: string;

  @Column({
    name: "product_id",
    type: "uuid",
  })
  productId: string;

  @ManyToOne(
    () => Plan,
    (plan) => plan.planModules,
    {
      nullable: false,
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({
    name: "plan_id",
    referencedColumnName: "id",
  })
  plan: Relation<Plan>;

  @ManyToOne(
    () => ProductModule,
    (item) => item.planModules,
    {
      nullable: false,
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({
    name: "product_module_id",
    referencedColumnName: "id",
  })
  productModule: Relation<ProductModule>;

  @Column({
    name: "status",
    type: "varchar",
    length: 20,
    default: "active",
    nullable: false,
  })
  status: string;
}