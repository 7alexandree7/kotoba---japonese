import { translateService } from "..//services/ai/translate.service.js"
import { generateWordService } from "../services/ai/generateWord.service.js";

export const translate = async (req, res) => {

    const { text, from, to } = req.body

    if (!text || !from || !to) {
        return res.status(400).json({ message: "Text, from and to are required." });
    }

    try {
        const translationData = await translateService({ text, from, to })

        if (!translationData) {
            return res.status(400).json({ message: "Translation failed." });
        }

        return res.status(200).json(translationData)

    } catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
}


export const generateWordWithAI = async (req, res) => {

    const { word } = req.body

    if (!word) {
        return res.status(400).json({ message: "Word is required." });
    }

    try {
        const generatedData = await generateWordService({ word })

        if (!generatedData) {
            return res.status(400).json({ message: "Word generation failed." });
        }

        return res.status(200).json(generatedData)

    } catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
}