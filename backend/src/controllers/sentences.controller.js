import { Sentence } from "../models/sentences.model.js";

export const createSentence = async (req, res) => {

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


export const updateSentece = async (req, res) => {

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


export const deleteSentence = async (req, res) => {

    const { id } = req.params;

    try {
        const sentence = await Sentence.findOneAndDelete({
            _id: id,
            user: req.user._id
        }, {
            returnDocument: "after"
        });

        if (!sentence) {
            return res.status(404).json({ message: "Sentença nao encontrada." });
        }

        return res.status(200).json({
            message: "Sentença excluida com sucesso!",
            success: true,
            sentence
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao excluir a sentença.",
            success: false,
            error: error.message
        })
    }
}


export const getMySentences = async (req, res) => {
    try {
        const sentences = await Sentence.find({ user: req.user._id })

        if (sentences.length === 0) {
            return res.status(200).json({
                message: "Nenhuma sentença encontrada.",
                success: true,
                total: 0,
                sentences: []
            })
        }

        return res.status(200).json({
            message: "Sentencas recuperadas com sucesso!",
            success: true,
            total: sentences.length,
            sentences
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar as sentencas.",
            success: false,
            error: error.message
        })
    }
}


export const getMySentenceById = async (req, res) => {

    const { id } = req.params;

    try {
        const sentence = await Sentence.findOne({
            _id: id,
            user: req.user._id
        })

        if (!sentence) {
            return res.status(404).json({ message: "Sentença nao encontrada." });
        }

        return res.status(200).json({
            message: "Sentença recuperada com sucesso!",
            success: true,
            sentence
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar a sentença.",
            success: false,
            error: error.message
        })
    }
}