export const ENV_VARIABLES = {
    RESEND_API_KEY: process.env.RESEND_API_KEY
}

if (!ENV_VARIABLES.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined")
}