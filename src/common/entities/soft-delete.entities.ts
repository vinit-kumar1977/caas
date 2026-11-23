import { DeleteDateColumn } from "typeorm";
import { TimestampEntity } from "./time-stamp.entities.js";

export abstract class SoftDeleteEntity extends TimestampEntity {

    @DeleteDateColumn({
        type: "timestamptz",
        nullable: true,
        select: false,
    })
    deleted_at: Date;
}