
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from "typeorm";
import { TimestampEntity } from "../../../common/entities/time-stamp.entities.js";
import { Product } from "./product.entities.js";
import { Module } from "../../modules/entities/module.entities.js";
import { PlanModule } from "../../plans/entities/plan-module.entities.js";


@Entity("product_modules")
@Index("uq_product_modules", ["product_id", "module_id"], { unique: true })

export class ProductModule extends TimestampEntity {
  @Column({ type: "uuid" })
  product_id: string;

  @Column({ type: "uuid" })
  module_id: string;

  @ManyToOne(() => Product, (product) => product.productModules, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "product_id", referencedColumnName: "id" })
  product: Product;

  @ManyToOne(() => Module, (module) => module.productModules, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "module_id", referencedColumnName: "id" })
  module: Module;

  @Column({ name: "sort_order", type: "integer", default: 0 })
  sortOrder: number;

  @OneToMany(() => PlanModule, (item) => item.productModule)
  planModules: PlanModule[];
}
