import mongoose from "mongoose";
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";


export async function connectDB() {
    try {
        await mongoose.connect(ENV_VARIABLES.MONGO_URL);
        console.log("Mongoose connected");
    } catch (error) {
        console.error("Mongoose connection error", error);
        process.exit(1);
    }
}