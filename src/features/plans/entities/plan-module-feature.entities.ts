import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
  Index,
  Check,
} from "typeorm";

import { TimestampEntity } from "../../../common/entities/time-stamp.entities.js";
import { PlanModule } from "./plan-module.entities.js";
import { ModuleFeature } from "../../modules/entities/module-feature.entities.js";

@Entity("plan_module_features")

@Index(
  "IDX_PLAN_MODULE_FEATURE_ENABLED",
  ["planId", "productModuleId", "enabled"],
)

@Index(
  "IDX_PLAN_MODULE_FEATURE_MODULE_FEATURE",
  ["moduleFeatureId"],
)

@Check(
  "CK_PLAN_MODULE_FEATURE_VALUE_OBJECT",
  `JSONB_TYPEOF("value") = 'object'`,
)

@Check(
  "CK_PLAN_MODULE_FEATURE_VALUE_SIZE",
  `OCTET_LENGTH("value"::TEXT) <= 65536`,
)

@Check(
  "CK_PLAN_MODULE_FEATURE_ENABLED",
  `"enabled" IN (TRUE, FALSE)`,
)

export class PlanModuleFeature extends TimestampEntity {

  @PrimaryColumn({
    name: "plan_id",
    type: "uuid",
  })
  planId: string;

  @PrimaryColumn({
    name: "product_module_id",
    type: "uuid",
  })
  productModuleId: string;

  @PrimaryColumn({
    name: "module_feature_id",
    type: "uuid",
  })
  moduleFeatureId: string;

  @ManyToOne(
    () => PlanModule,
    {
      nullable: false,
      onDelete: "CASCADE",
    },
  )
  @JoinColumn([
    {
      name: "plan_id",
      referencedColumnName: "planId",
    },
    {
      name: "product_module_id",
      referencedColumnName: "productModuleId",
    },
  ])
  planModule: Relation<PlanModule>;


  @ManyToOne(
    () => ModuleFeature,
    {
      nullable: false,
      onDelete: "RESTRICT",
    },
  )
  @JoinColumn({
    name: "module_feature_id",
    referencedColumnName: "id",
  })
  moduleFeature: Relation<ModuleFeature>;


  @Column({
    name: "enabled",
    type: "boolean",
    default: false,
    nullable: false,
  })
  enabled: boolean;


  @Column({
    name: "value",
    type: "jsonb",
    default: () => "'{}'::jsonb",
    nullable: false,
  })
  value: Record<string, unknown>;
}