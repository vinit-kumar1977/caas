import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PrimaryKey } from "./primary-key.entities.js";

export abstract class TimestampEntity extends PrimaryKey {

    @CreateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updated_at: Date;
}