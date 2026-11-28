
import {
    Entity,
    Column,
    Relation,
    ManyToOne,
    JoinColumn,
    Index,
    Check,
    Unique,
} from "typeorm";
import { AuditEntity } from "../../../common/entities/audit.entities.js";
import { Module } from "./module.entities.js";
import { FeatureCatalog } from "../../../common/entities/feature-catalog.entities.js";

@Entity("module_features")
@Unique("UQ_MODULE_FEATURE_MODULE_FEATURE", ["moduleId", "featureId"])

@Index("IDX_MODULE_FEATURE_MODULE_STATUS", ["moduleId", "status"])
@Index("IDX_MODULE_FEATURE_FEATURE", ["featureId"])

@Check(
    "CK_MODULE_FEATURE_STATUS",
    `"status" IN ('active', 'inactive', 'archived')`,
)

export class ModuleFeature extends AuditEntity {
    @Column({ type: "uuid", name: "module_id" })
    moduleId: string;

    @ManyToOne(() => Module, (module) => module.moduleFeatures)
    @JoinColumn({ name: "module_id", referencedColumnName: "id" })
    module: Relation<Module>;

    @Column({ type: "uuid", name: "feature_id" })
    featureId: string;

    @ManyToOne(() => FeatureCatalog, (feature) => feature.moduleFeatures)
    @JoinColumn({ name: "feature_id", referencedColumnName: "id" })
    feature: Relation<FeatureCatalog>;

    @Column({
        type: "varchar",
        default: "active",
    })
    status: string;
}
