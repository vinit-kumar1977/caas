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
    name:"created_by"
  })
  createdBy: string | null;

  @Column({
    type: "uuid",
    select:false,
    name:"updated_by",
    nullable: true,
  })
  updatedBy: string | null;

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