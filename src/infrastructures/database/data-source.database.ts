import "reflect-metadata";
import { DataSource } from "typeorm";
import databaseConfigs from "../../configs/database.configs.js";

export const AppDataSource = new DataSource(databaseConfigs);
export const initializeDataBase = async () => {
    try {
        console.log("6. Driver:", AppDataSource.options.type);

        await AppDataSource.initialize();

        console.log("7. Database initialized successfully");
    } catch (error) {
        console.error("Database initialization failed:", error);
        throw error;
    }
};