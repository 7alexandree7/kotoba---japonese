import { Word } from "../models/words.model.js";


export const createWord = async (req, res) => {

    const { japanese, reading, meaning, example, exampleTranslation, category, jlptLevel, difficulty, notes } = req.body;

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

        console.log(req.user)

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
        res.status(200).json({
            message: "Palavra atualizada com sucesso!",
            success: true,
            word: word
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
            word: word
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
        res.status(200).json({
            message: "Palavras recuperadas com sucesso!",
            success: true,
            words: words
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
            word: word
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

        res.status(200).json({
            message: `Palavras encontradas com sucesso!`,
            success: true,
            words: words
        })

    } catch (error) {
        res.status(500).json({
            message: "Erro ao pesquisar as palavras.",
            success: false,
            error: error.message
        })
    }
}