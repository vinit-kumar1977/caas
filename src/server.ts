import "dotenv/config";
import app from "./app.js";
import envConfigurations from "./configs/env.configs.js";
import { initializeDataBase } from "./infrastructures/database/data-source.database.js";

const startServer = async () => {
    try {
        await initializeDataBase();

        app.listen(envConfigurations.APP_PORT, () => {
            console.log(
                `App is running on port ${envConfigurations.APP_PORT}`
            );
            console.log(new Date().toLocaleString());
        });

    } catch (error) {
        console.error("Failed to start server:");

        if (error instanceof Error) {
            console.error("Name:", error.name);
            console.error("Message:", error.message);
            console.error("Stack:", error.stack);
            console.error("Cause:", error.cause);
        } else {
            console.error(error);
        }

        process.exit(1);
    }
};

startServer();
