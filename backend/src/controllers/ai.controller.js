import {translateService} from "..//services/ai/translate.service.js"

export const translate = async (req, res) => {

    const { text, from, to } = req.body

    if (!text || !from || !to) {
        return res.status(400).json({ message: "Text, from and to are required." });
    }

    try {
        
        const response = await translateService({ text, from, to })

        if(!response) {
            return res.status(400).json({ message: "Translation failed." });
        }

        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
}