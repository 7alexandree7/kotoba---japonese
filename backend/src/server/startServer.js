import app from "../index.js";
import { PORT } from "../config/ENV_VARIABLES.js";
import { connectDB } from "../db/connectDB.js";

export const startServer = () => {
    try {
        await connectDB();
        app.listen(PORT, () => (
            console.log(`Server running on port ${PORT}`)
        ))
    } catch (error) {
        console.error("Error starting server", error)
        process.exit(1)
    }
}


startServer();