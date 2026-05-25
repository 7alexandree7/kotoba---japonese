import app from "../index.js";
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";
import { connectDB } from "../db/connectDB.js";

export const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV_VARIABLES.PORT, () => (
            console.log(`Server running on port ${ENV_VARIABLES.PORT}`)
        ))
    } catch (error) {
        console.error("Error starting server", error)
        process.exit(1)
    }
}


startServer();