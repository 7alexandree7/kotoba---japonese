import { z} from "zod";


export const wordsSchema = z.object({
    japanese: z.string().trim().min(1, "Japanese word is required"),
    meaning: z.string().trim().min(1, "Meaning is required"),
    example: z.string().trim().min(4, "Example sentence is required"),
    exampleTranslation: z.string().trim().min(4, "Example translation is required"),
    notes: z.string().trim().optional(),

    category: z.enum(["Substantivo", "Verbo", "Adjetivo", "Advérbio", "Partícula", "Expressão", "Outro"]),
    jlptLevel: z.enum(["N5", "N4", "N3", "N2", "N1", "Outro"]),
    difficulty: z.enum(["Fácil", "Médio", "Difícil"])
})