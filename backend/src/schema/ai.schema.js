import { z } from "zod";


export const translateAi = z.object({
    text: z.string().trim().min(1, "Text is required"),
    from: z.enum(["pt", "ja"]),
    to: z.enum(["pt", "ja"]),
})