import 'dotenv/config'

export const ENV_VARIABLES = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_DOMAIN: process.env.RESEND_DOMAIN,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
    PRODUCTIONAPIKEY: process.env.PRODUCTIONAPIKEY
}

if (!ENV_VARIABLES.RESEND_API_KEY || !ENV_VARIABLES.RESEND_DOMAIN) {
    throw new Error("RESEND_API_KEY or RESEND_DOMAIN is not defined")
}

if (!ENV_VARIABLES.PORT) {
    throw new Error("PORT is not defined")
}

if (!ENV_VARIABLES.MONGO_URL) {
    throw new Error("MONGO_URL is not defined")
}

if (!ENV_VARIABLES.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined")
}

if (!ENV_VARIABLES.NODE_ENV) {
    throw new Error("NODE_ENV is not defined")
}

if (!ENV_VARIABLES.CLIENT_URL) {
    throw new Error("CLIENT_URL is not defined")
}

if (!ENV_VARIABLES.PRODUCTIONAPIKEY) {
    throw new Error("PRODUCTIONAPIKEY is not defined")
}