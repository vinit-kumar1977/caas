import "dotenv/config";
import app from "./app.js";
import envConfigurations from "./configs/env.configs.js";
import { initializeDataBase } from "./infrastructures/database/data-source.database.js";

const startServer = async () => {
    try {
        await initializeDataBase();
        // await seedProduct();
        // await seedSuperUser();
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
  }
};
startServer();

app.listen(envConfigurations.APP_PORT,()=>console.log(`App is running ${envConfigurations.APP_PORT}\n${new Date().toLocaleString()}`));