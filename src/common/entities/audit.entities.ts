import {
  BeforeInsert,
  BeforeUpdate,
  Column,
} from "typeorm";
import { SoftDeleteEntity } from "./soft-delete.entities.js";


export abstract class AuditEntity extends SoftDeleteEntity {

  @Column({
    type: "uuid",
    nullable: true,
    update: false,
    select:false,
  })
  created_by: string | null;

  @Column({
    type: "uuid",
    select:false,
    nullable: true,
  })
  updated_by: string | null;

  @BeforeInsert()
  protected beforeInsert(): void {
    // const userId = RequestContext.getCurrentUserId();
    // if (!userId) return;
    // this.createdBy = userId;
  }

  @BeforeUpdate()
  protected beforeUpdate(): void {
    // const userId = RequestContext.getCurrentUserId();
    // if (!userId) return;
    // this.updatedBy = userId;
  }
}