import { Word } from "../models/words.model.js";


export const createWord = async (req, res) => {
    try {
        const newWord = new Word({
            ...req.body,
            user: req.user._id
        })


        await newWord.save();

        res.status(201).json({
            message: "Palavra criada com sucesso!",
            success: true,
            word: newWord
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao criar a palavra.",
            success: false,
            error: error.message
        });
    }
}


export const updateWord = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID da palavra obrigatório." });
    }

    try {
        const word = await Word.findOneAndUpdate({
            _id: id, user: req.user._id
        }, req.body, { returnDocument: "after" });

        if(!word) {
            return res.status(404).json({ message: "Palavra nao encontrada." });
        }

        res.status(200).json({
            message: "Palavra atualizada com sucesso!",
            success: true,
            word
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar a palavra.",
            success: false,
            error: error.message
        });
    }
}


export const deleteWord = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID da palavra obrigatório." });
    }

    try {
        const word = await Word.findOneAndDelete({
            _id: id, user: req.user._id
        });
        if (!word) {
            return res.status(404).json({ message: "Palavra não encontrada." });
        }
        res.status(200).json({
            message: "Palavra excluída com sucesso!",
            success: true,
            word
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao excluir a palavra.",
            success: false,
            error: error.message
        });
    }
}


export const getMyWords = async (req, res) => {
    try {
        const words = await Word.find({ user: req.user._id });

        if (words.length === 0) {
            return res.status(200).json({
                message: "Nenhuma palavra encontrada.",
                success: true,
                total: 0,
                words: []
            });
        }
        res.status(200).json({
            message: "Palavras recuperadas com sucesso!",
            success: true,
            total: words.length,
            words
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao recuperar as palavras.",
            success: false,
            error: error.message
        });
    }
}


export const getWordsById = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID da palavra obrigatório." });
    }

    try {
        const word = await Word.findOne({
            _id: id, user: req.user._id
        })

        if (!word) {
            return res.status(404).json({ message: "Palavra não encontrada." });
        }

        res.status(200).json({
            message: `Palavra ${word.japanese} recuperada com sucesso!`,
            success: true,
            word
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao recuperar a palavra.",
            success: false,
            error: error.message
        });
    }
}


export const searchMyWords = async (req, res) => {

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Query de pesquisa obrigatória." });
    }

    try {
        const words = await Word.find({
            user: req.user._id,
            $or: [
                {
                    japanese: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    meaning: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        })

        if (words.length === 0) {
            return res.status(200).json({
                message: `Nenhuma palavra encontrada para a query: ${query}`,
                success: true,
                total: 0,
                words: []
            });
        }

        res.status(200).json({
            message: `Palavras encontradas com sucesso!`,
            success: true,
            total: words.length,
            words
        })

    } catch (error) {
        res.status(500).json({
            message: "Erro ao pesquisar as palavras.",
            success: false,
            error: error.message
        })
    }
}


export const getMyFavoriteWords = async (req, res) => {

    try {
        const words = await Word.find({ user: req.user._id, isFavorite: true });

        if (words.length === 0) {
            return res.status(200).json({
                message: "Nenhuma palavra favorita encontrada.",
                success: true,
                total: 0,
                words: []
            });
            return
        }

        res.status(200).json({
            message: "Palavras favoritas recuperadas com sucesso!",
            success: true,
            total: words.length,
            words
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao recuperar as palavras favoritas.",
            success: false,
            error: error.message
        });
    }
}


export const toggleFavoriteWord = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID da palavra obrigatório." });
    }

    try {
        const words = await Word.findOne({ user: req.user._id, _id: id });

        if (!words) {
            return res.status(404).json({ message: "Palavra não encontrada." });
        }

        words.isFavorite = !words.isFavorite;
        await words.save();

        res.status(200).json({
            message: `Palavra ${words.japanese} atualizada com sucesso!`,
            success: true,
            words
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar a palavra.",
            success: false,
            error: error.message
        });
    }
}


export const filterWords = async (req, res) => {

    const { category, jlptLevel, difficulty } = req.query;

    if (!category && !jlptLevel && !difficulty) {
        return res.status(400).json({ message: "Pelo menos um filtro deve ser fornecido." });
    }

    try {
        const filter = {
            user: req.user._id
        };

        if (category) filter.category = category;
        if (jlptLevel) filter.jlptLevel = jlptLevel;
        if (difficulty) filter.difficulty = difficulty;

        const words = await Word.find(filter);

        if (words.length === 0) {
            return res.status(200).json({
                message: "Nenhuma palavra encontrada com os filtros fornecidos.",
                success: true,
                total: 0,
                words: []
            });
        }

        return res.status(200).json({
            message: "Palavras filtradas com sucesso!",
            success: true,
            total: words.length,
            words
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao filtrar as palavras.",
            success: false,
            error: error.message
        });
    }

}