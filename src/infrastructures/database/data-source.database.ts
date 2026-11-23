import "reflect-metadata";
import { DataSource } from "typeorm";
import databaseConfigs from "../../configs/database.configs.js";

export const AppDataSource = new DataSource(databaseConfigs);
export const initializeDataBase = async () => {
  await AppDataSource.initialize();
  console.log("Databse initialize");
};
