import {
    Entity,
    Column,
    Index,
    ManyToOne,
    JoinColumn,
    Relation,
    Check,
} from "typeorm";
import { TimestampEntity } from "../../../common/entities/time-stamp.entities.js";
import { Tenant } from "./tenant.entities.js";

@Entity("subscriptions")

@Index("IDX_SUBSCRIPTION_TENANT", ["tenantId"])
@Index("IDX_SUBSCRIPTION_TENANT_STATUS", ["tenantId", "status"])
@Index("IDX_SUBSCRIPTION_STATUS", ["status"])
@Index("UQ_SUBSCRIPTION_CODE", ["subscriptionCode"], {
    unique: true,
})
@Check(
    "CK_SUBSCRIPTION_DATE_RANGE",
    `"end_at" IS NULL OR "start_at" IS NULL OR "end_at" > "start_at"`
)

@Check(
    "CK_SUBSCRIPTION_PERIOD_RANGE",
    `"current_period_end" IS NULL OR "current_period_start" IS NULL OR "current_period_end" > "current_period_start"`
)

@Check(
    "CK_SUBSCRIPTION_CANCELLED_AT",
    `"cancel_at_period_end" = FALSE OR "auto_renew" = FALSE`
)

export class Subscription extends TimestampEntity {

    @Column({
        name: "tenant_id",
        type: "uuid",
    })
    tenantId: string;

    @ManyToOne(() => Tenant, {
        onDelete: "RESTRICT",
    })
    @JoinColumn({
        name: "tenant_id",
        referencedColumnName: "id",
    })
    tenant: Relation<Tenant>;

    @Column({
        name: "subscription_code",
        type: "varchar",
        length: 50,
        unique: true,
    })
    subscriptionCode: string;

    @Column({
        name: "promo_code",
        type: "varchar",
        length: 100,
        nullable: true
    })
    promoCode: string | null;

    @Column({
        type: "varchar",
        name: "status",
        default: "draft",
    })
    status: string;

    @Column({
        name: "start_at",
        type: "timestamptz",
        nullable: true,
    })
    startAt: Date | null;

    @Column({
        name: "end_at",
        type: "timestamptz",
        nullable: true,
    })
    endAt: Date | null;

    @Column({
        name: "current_period_start",
        type: "timestamptz",
        nullable: true,
    })
    currentPeriodStart: Date | null;

    @Column({
        name: "current_period_end",
        type: "timestamptz",
        nullable: true,
    })
    currentPeriodEnd: Date | null;

    @Column({
        name: "auto_renew",
        type: "boolean",
        default: true,
    })
    autoRenew: boolean;

    @Column({
        name: "cancel_at_period_end",
        type: "boolean",
        default: false,
    })
    cancelAtPeriodEnd: boolean;

    @Column({
        name: "cancelled_at",
        type: "timestamptz",
        nullable: true,
    })
    cancelledAt: Date | null;

    @Column({
        type: "jsonb",
        default: () => "'{}'::jsonb",
    })
    metadata: Record<string, unknown>;
}