
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TimestampEntity } from "../../../common/entities/time-stamp.entities.js";
import { Plan } from "./plan.entities.js";
import { ProductModule } from "../../modules/entities/product-module.entities.js";

@Entity("plan_modules")
export class PlanModule extends TimestampEntity{

  @PrimaryColumn("uuid")
  plan_id: string;

  @PrimaryColumn("uuid")
  product_module_id: string;

  @Column({ type: "uuid" })
  product_id: string;

  @ManyToOne(() => Plan, (plan) => plan.planModules, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "planId",referencedColumnName:"id" })
  plan: Plan;

  @ManyToOne(
    () => ProductModule,
    (item) => item.planModules,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "productModuleId",referencedColumnName:"id" })
  productModule: ProductModule;
}
