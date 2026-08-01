import { z } from "zod";


export const translateAiSchema = z.object({
    text: z.string().trim().min(1, "Text is required"),
    from: z.enum(["pt", "ja"]),
    to: z.enum(["pt", "ja"]),
})


export const generateWordSchema = z.object({
    word: z.string().trim().min(1, "Word is required"),
})