import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PrimaryKey } from "./primary-key.entities.js";

export abstract class TimestampEntity extends PrimaryKey {

    @CreateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
        name:"created_at"
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        name:"updated_at",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}