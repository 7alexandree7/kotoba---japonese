import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
    japanese: { type: String, required: true },
    reading: { type: String },
    meaning: { type: String, required: true },
    example: { type: String, required: true },
    notes: { type: String },
    exampleTranslation: { type: String, required: true },
    category: {
        type: String, required: true, enum: ["Substantivo", "Verbo", "Adjetivo", "Advérbio", "Partícula", "Expressão", "Outro"]
    },
    jlptLevel: { type: String, enum: ["N5", "N4", "N3", "N2", "N1", "Outro"], required: true },

    isFavorite: { type: Boolean, default: false },

    reviewCount: { type: Number, default: 0 },
    lastReviewedAt: { type: Date },
    nextReviewAt: { type: Date, index: true },
    difficulty: { type: String, enum: ["Fácil", "Médio", "Difícil"], required: true },
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
}, { timestamps: true });

export const Word = mongoose.model("Word", wordSchema);
