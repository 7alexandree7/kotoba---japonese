import 'dotenv/config'

export const ENV_VARIABLES = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL
}

if (!ENV_VARIABLES.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined")
}

if (!ENV_VARIABLES.PORT) {
    throw new Error("PORT is not defined")
}

if (!ENV_VARIABLES.MONGO_URL) {
    throw new Error("MONGO_URL is not defined")
}