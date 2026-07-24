import mongoose from "mongoose";

const KanjiSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    kanji: { type: String, required: true, index: true },
    meanings: [{ type: String, required: true }],
    onyomi: [{ type: String, required: true }],
    kunyomi: [{ type: String, required: true }],
    strokes: { type: Number, required: true },

    notes: { type: String },
    isFavorite: { type: Boolean, default: false, },
    jlptLevel: { type: String, enum: ["N5", "N4", "N3", "N2", "N1", "Outro"], required: true },
    difficulty: { type: String, enum: ["Fácil", "Médio", "Difícil"], required: true },

    reviewCount: { type: Number, default: 0 },
    lastReviewedAt: { type: Date },
    nextReviewAt: { type: Date, index: true },

}, { timestamps: true });

export const Kanji = mongoose.model("Kanji", KanjiSchema)