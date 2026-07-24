import { Kanji } from "../models/kanji.models.js"


export const createKanji = async (req, res) => {

    try {
        const newKanji = new Kanji({ ...req.body, user: req.user._id, nextReviewAt: new Date() });

        if (!newKanji) {
            return res.status(404).json({ message: "Kanji nao encontrado." });
        }

        await newKanji.save();

        return res.status(201).json({
            message: "Kanji criado com sucesso!",
            success: true,
            kanji: newKanji
        })
    }

    catch (error) {
        res.status(500).json({
            message: "Erro ao criar o kanji.",
            success: false,
            error: error.message
        });
    }
}


export const updateKanji = async (req, res) => {

    const { id } = req.params;

    try {
        const updatedKanji = await Kanji.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { returnDocument: "after" });

        if (!updatedKanji) {
            return res.status(404).json({ message: "Kanji nao encontrado." });
        }

        return res.status(200).json({
            message: "Kanji atualizado com sucesso!",
            success: true,
            kanji: updatedKanji
        })

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar o kanji.",
            success: false,
            error: error.message
        })
    }
}


export const deleteKanji = async (req, res) => {

    const { id } = req.params;

    try {
        const kanji = await Kanji.findOneAndDelete({ _id: id, user: req.user._id });

        if (!kanji) {
            return res.status(404).json({ message: "Kanji nao encontrado." });
        }

        return res.status(200).json({
            message: "Kanji excluido com sucesso!",
            success: true,
            kanji
        })
    }

    catch (error) {
        return res.status(500).json({
            message: "Erro ao excluir o kanji.",
            success: false,
            error: error.message
        })
    }
}