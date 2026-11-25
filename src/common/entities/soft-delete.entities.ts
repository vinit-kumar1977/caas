import { DeleteDateColumn } from "typeorm";
import { TimestampEntity } from "./time-stamp.entities.js";

export abstract class SoftDeleteEntity extends TimestampEntity {

    @DeleteDateColumn({
        type: "timestamptz",
        nullable: true,
        select: false,
        name:"deleted_at"
    })
    deletedAt: Date;
}