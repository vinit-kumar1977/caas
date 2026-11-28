
import { Column, Entity, Index } from "typeorm";
import { AuditEntity } from "../../../common/entities/audit.entities.js";

@Entity("tenants")
@Index("uq_tenants_code", ["code"], { unique: true })
@Index("uq_tenants_sub_domain", ["subDomain"], { unique: true })
@Index("idx_tenants_status", ["status"])
export class Tenant extends AuditEntity {

  @Column({
    name: "code",
    type: "varchar",
    length: 50,
  })
  code: string;

  @Column({
    type: "varchar",
    length: 150,
  })
  name: string;

  @Column({
    name: "sub_domain",
    type: "varchar",
    length: 100,
  })
  subDomain: string;

  @Column({
    type: "varchar",
    length: 30,
    default: "active",
  })
  status: string;

  @Column({
    type: "jsonb",
    default: () => "'{}'::jsonb",
  })
  settings: Record<string, unknown>;
}
