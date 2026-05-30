import { z } from "zod";


export const registerSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
)


export const loginSchema = z.object({
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const verifyEmailSchema = z.object({
    code: z.string().regex(/^\d{6}$/, "Verification code must contain exactly 6 digits")
})