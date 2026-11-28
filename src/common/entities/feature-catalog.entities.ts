
import {
    Entity,
    Column,
    Index,
    Check,
    OneToMany,
    Relation,
} from "typeorm";

import { AuditEntity } from "./audit.entities.js";
import { ModuleFeature } from "../../features/modules/entities/module-feature.entities.js";

@Entity("feature_catalogs")
@Index("UQ_FEATURE_CATALOGS_CODE", ["code"], { unique: true })
@Index("IDX_FEATURE_CATALOGS_STATUS", ["status"])
@Index("IDX_FEATURE_CATALOGS_SYSTEM_STATUS", ["isSystem", "status"])

@Check(
    "CK_FEATURE_CATALOGS_CODE",
    `"code" ~ '^[A-Z][A-Z0-9_]{1,99}$'`,
)

@Check(
    "CK_FEATURE_CATALOGS_NAME",
    `"name" = BTRIM("name") AND LENGTH("name") BETWEEN 2 AND 150`,
)

@Check(
    "CK_FEATURE_CATALOGS_DESCRIPTION",
    `"description" IS NULL OR LENGTH("description") <= 2000`,
)

@Check(
    "CK_FEATURE_CATALOGS_FEATURES_OBJECT",
    `JSONB_TYPEOF("features") = 'object'`,
)

@Check(
    "CK_FEATURE_CATALOGS_FEATURES_SIZE",
    `OCTET_LENGTH("features"::TEXT) <= 65536`,
)

export class FeatureCatalog extends AuditEntity {

    @Column({
        type: "varchar",
        length: 100,
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
        name: "feature_type",
        type: "varchar",
    })
    featureType: string;

    @Column({
        type: "jsonb",
        default: () => "'{}'::jsonb",
    })
    features: Record<string, unknown>;

    @Column({
        name: "is_system",
        type: "boolean",
        default: true,
    })
    isSystem: boolean;

    @Column({
        type: "varchar",
        default: "active",
    })
    status: string;

    @OneToMany(() => ModuleFeature, (item) => item.feature)
    moduleFeatures: Relation<ModuleFeature[]>;
}
