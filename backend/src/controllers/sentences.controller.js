import { Sentence } from "../models/sentences.model.js";

export const createSentence = (req, res) => {

    try {
        const newSentence = new Sentence({ ...req.body, user: req.user._id, nextReviewAt: new Date() });

        await newSentence.save();
        return res.status(201).json({
            message: "Sentença criada com sucesso!",
            success: true,
            sentence: newSentence
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao criar a sentença.",
            success: false,
            error: error.message
        });
    }
}

export const updateSentece = (req, res) => {

}


export const updateSentece = (req, res) => {

    const { id } = req.params;

    try {
        const sentece = await Sentence.findOneAndUpdate({
            _id: id,
            user: req.user._id,
        }, req.body, {
            returnDocument: "after"
        })

        if (!sentece) {
            return res.status(404).json({ message: "Sentença nao encontrada." });
        }

        return res.status(200).json({
            message: "Sentença atualizada com sucesso!",
            success: true,
            sentece
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar a sentença.",
            success: false,
            error: error.message
        });
    }
}