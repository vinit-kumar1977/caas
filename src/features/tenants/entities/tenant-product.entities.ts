import { Column, Entity, Index, Unique } from "typeorm";
import { TimestampEntity } from "../../../common/entities/time-stamp.entities.js";

@Entity('tenant_products')
@Unique(['tenant_id', 'product_id'])
@Index(['tenant_id', 'status'])
@Index(['product_id', 'status'])
export class TenantProduct extends TimestampEntity {
  @Column({ type: 'uuid' })
  tenant_id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'varchar', length: 30, default: 'ACTIVE' })
  status: string;

  @Column({ type: 'jsonb', default: {} })
  settings: Record<string, unknown>;

  @Column({
    type: "timestamptz",
    name: "activated_at",
    nullable:true
  })
  activatedAt:Date | null
}