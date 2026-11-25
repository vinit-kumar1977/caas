import { Column, Entity, Index, Unique } from "typeorm";
import { TimestampEntity } from "../../../common/entities/time-stamp.entities.js";

@Entity('tenant_products')
@Unique(['tenant_id', 'product_id'])
@Index(['tenant_id', 'status'])
@Index(['product_id', 'status'])
export class TenantProduct extends TimestampEntity{
  @Column({ type: 'uuid' })
  tenant_id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'varchar', length: 30, default: 'ACTIVE' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  subscription_plan_id: string | null;

  @Column({ type: 'int', nullable: true })
  maxUsers: number | null;

  @Column({ type: 'bigint', nullable: true })
  maxStorage: string | null;

  @Column({ type: 'jsonb', default: {} })
  settings: Record<string, unknown>;

//   @ManyToOne(() => Tenant, tenant => tenant.tenantProducts, {
//     onDelete: 'RESTRICT',
//   })
//   @JoinColumn({ name: 'tenant_id' })
//   tenant: Tenant;

//   @ManyToOne(() => Product, {
//     onDelete: 'RESTRICT',
//   })
//   @JoinColumn({ name: 'product_id' })
//   product: Product;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;
}