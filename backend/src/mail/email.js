import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";
import { resend } from "../mail/resend.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js";

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


export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Welcome to Kotoba Japonese!",
            html: WELCOME_EMAIL_TEMPLATE(name)
        })
        console.log("Welcome email sent:", response);
    } catch (error) {
        console.error("Error sending welcome email:", error.message);
        throw error;
    }
}


export const sendResetPasswordEmail = async (email, resetToken) => {
    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE(email, resetToken)
        })
        console.log("Reset password email sent:", response);
    } catch (error) {
        console.error("Error sending reset password email:", error.message);
        throw error;
    }
}