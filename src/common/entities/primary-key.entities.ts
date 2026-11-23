import { PrimaryGeneratedColumn } from "typeorm";

export abstract class PrimaryKey {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}