import { z } from "zod";

export const kanjiSchema = z.object({
    kanji: z.string().trim().min(1, "Kanji is required"),
    meanings: z.array(z.string()).min(1, "Meanings are required"),
    onyomi: z.array(z.string()).min(1, "Onyomi is required"),
    kunyomi: z.array(z.string()).min(1, "Kunyomi is required"),
    strokes: z.number().min(1, "Strokes is required"),
    jlptLevel: z.enum(["N5", "N4", "N3", "N2", "N1", "Outro"]),
    difficulty: z.enum(["Fácil", "Médio", "Difícil"]),
    notes: z.string().trim().optional()
})