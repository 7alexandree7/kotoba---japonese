import { z } from "zod";


export const senteceSchema = z.object({
    japanese: z.string().trim().min(1, "Japanese sentence is required"),
    reading: z.string().trim().optional(),
    translation: z.string().trim().min(1, "Translation is required"),
    source: z.string().trim().optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().trim().optional(),
    jlptLevel: z.enum(["N5", "N4", "N3", "N2", "N1", "Outro"]),
    difficulty: z.enum(["Fácil", "Médio", "Difícil"])
})