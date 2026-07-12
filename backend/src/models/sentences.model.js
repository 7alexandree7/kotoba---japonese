import mongoose from "mongoose";


const sentencesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    japanese: { type: String, required: true },
    reading: { type: String },
    translation: { type: String, required: true },

    source: { type: String },
    tags: [{ type: String }],
    notes: { type: String },

    jlptLevel: { type: String, enum: ["N5", "N4", "N3", "N2", "N1", "Outro"], required: true },
    difficulty: { type: String, enum: ["Fácil", "Médio", "Difícil"], required: true },

    isFavorite: { type: Boolean, default: false },

    reviewCount: { type: Number, default: 0 },
    lastReviewedAt: { type: Date },
    nextReviewAt: { type: Date, index: true },

}, { timestamps: true });


export const Sentence = mongoose.model("Sentence", sentencesSchema);