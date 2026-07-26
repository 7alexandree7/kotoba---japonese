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


export const getKanji = async (req, res) => {

    try {
        const kanji = await Kanji.find({ user: req.user._id })

        if (kanji.length === 0) {
            return res.status(200).json({
                message: "Nenhum kanji encontrado.",
                success: true,
                total: 0
            })
        }

        return res.status(200).json({
            message: "Kanji recuperados com sucesso!",
            success: true,
            total: kanji.length,
            kanji
        })
    }

    catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar os kanji.",
            success: false,
            error: error.message
        })
    }
}


export const getKanjiById = async (req, res) => {

    const { id } = req.params;

    try {
        const kanji = await Kanji.findOne({ _id: id, user: req.user._id })

        if (!kanji) {
            return res.status(404).json({ message: "Kanji nao encontrado." });
        }

        return res.status(200).json({
            message: "Kanji recuperado com sucesso!",
            success: true,
            kanji
        })
    }

    catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar o kanji.",
            success: false,
            error: error.message
        })
    }
}


export const toggleFavoriteKanji = async (req, res) => {

    const { id } = req.params;

    try {
        const kanji = await Kanji.findOneAndUpdate({ _id: id, user: req.user._id }, { returnDocument: "after" });

        if (!kanji) {
            return res.status(404).json({ message: "Kanji não encontrado." });
        }

        kanji.isFavorite = !kanji.isFavorite;
        await kanji.save();

        return res.status(200).json({
            message: "Kanji atualizado com sucesso!",
            success: true,
            kanji
        })

    }

    catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar o kanji.",
            success: false,
            error: error.message
        })
    }

}


export const getFavoritesKanji = async (req, res) => {

    try {
        const favoritesKanji = await Kanji.find({ user: req.user_id, isFavorite: true });

        return res.status(200).json({
            message: "Kanji recuperados com sucesso!",
            success: true,
            favoriteKanji
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar os kanji.",
            success: false,
            error: error.message
        })
    }
}


export const searchKanji = async (req, res) => {

    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ message: "Query de pesquisa obrigatória." });
    }

    try {
        const kanji = await Kanji.find({
            user: req.user._id,
            $or: [
                { kanji: { $regex: search, $options: "i" } },
                { meanings: { $regex: search, $options: "i" } },
                { onyomi: { $regex: search, $options: "i" } },
                { kunyomi: { $regex: search, $options: "i" } },
            ]
        })

        if (kanji.length === 0) {
            return res.status(200).json({
                message: `Nenhum kanji encontrado para a query: ${search}`,
                success: true,
                total: 0
            })
        }

        return res.status(200).json({
            message: "Kanji recuperados com sucesso!",
            success: true,
            total: kanji.length,
            kanji
        })
    }

    catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar os kanji.",
            success: false,
            error: error.message
        })
    }
}



export const filterKanji = async (req, res) => {

    const { jlptLevel, difficulty, strokes, kanji, onyomi, kunyomi, meanings } = req.query;

    if (!jlptLevel && !difficulty && !strokes && !kanji && !onyomi && !kunyomi && !meanings) {
        return res.status(400).json({ message: "Pelo menos um filtro deve ser fornecido." });
    }

    try {
        const filter = { user: req.user._id };

        if (jlptLevel) filter.jlptLevel = jlptLevel;
        if (difficulty) filter.difficulty = difficulty;
        if (strokes) filter.strokes = strokes;
        if (kanji) filter.kanji = kanji;
        if (onyomi) filter.onyomi = onyomi;
        if (kunyomi) filter.kunyomi = kunyomi;
        if (meanings) filter.meanings = meanings;

        const kanji = await Kanji.find(filter);

        if (kanji.length == 0) {
            return res.status(200).json({
                message: "Nenhum kanji encontrado com os filtros fornecidos.",
                success: true,
                total: 0
            })
        }

        return res.status(200).json({
            message: "Kanji recuperados com sucesso!",
            success: true,
            total: kanji.length,
            kanji
        })

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar os kanji.",
            success: false,
            error: error.message
        })
    }
}