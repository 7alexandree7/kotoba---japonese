import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";
import { resend } from "../mail/resend.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Verify Your Account",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode)
        })
        console.log("Verification email sent:", response);
    } catch (error) {
        console.error("Error sending verification email:", error.message);
        throw error;
    }
}