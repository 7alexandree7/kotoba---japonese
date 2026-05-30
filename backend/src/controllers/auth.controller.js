import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generatetokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { userNotPassword } from "../utils/userNotPassword.js";
import { sendPasswordResetSuccessEmail, sendResetPasswordEmail, sendVerificationEmail, sendWelcomeEmail } from "../mail/email.js";
import crypto from "crypto";

export const testRouterAuth = (req, res) => res.send("Auth route is working");

export const signup = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const verificationToken = generateVerificationToken();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        })

        await newUser.save();
        generatetokenAndSetCookie(res, newUser._id);
        await sendVerificationEmail(email, verificationToken);

        return res.status(201).json({
            success: true,
            message: "User registered successfully. Please check your email to verify your account.",
            data: userNotPassword(newUser)
        })
    }

    catch (error) {
        console.log("Error checking existing user:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generatetokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: userNotPassword(user)
        })

    } catch (error) {
        console.log("Error logging in user:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ message: "User logged out successfully" });
}

export const verifyEmail = async (req, res) => {

    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: "Verification code is required" });
    }

    try {
        const user = await User.findOne({ verificationToken: code, verificationTokenExpiresAt: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.log("Error verifying email:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const forgotPassword = async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Set token to expire in 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        await sendResetPasswordEmail(user.email, resetToken);

        return res.status(200).json({ message: "Password reset email sent successfully" });

    } catch (error) {
        console.log("Error resetting password:", error);
        return res.status(500).json({ message: "Server error" });
    }
}


export const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Reset token is required" });
    }

    if (!newPassword) {
        return res.status(400).json({ message: "New password is required" });
    }

    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendPasswordResetSuccessEmail(user.email, user.name);

        return res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.log("Error resetting password:", error);
        return res.status(500).json({ message: "Server error" });
    }

}