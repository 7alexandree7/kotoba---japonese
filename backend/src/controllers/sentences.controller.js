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

export const searchMySentences = async (req, res) => {

    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ message: "Query de pesquisa obrigatória." });
    }

    try {
        const senteces = await Sentence.find({
            user: req.user._id,
            $or: [
                {
                    japanese: {
                        $regex: search,
                        $options: "i"
                    },
                },
                {
                    meaning: {
                        $regex: search,
                        $options: "i"
                    },

                },
                {
                    translation: {
                        $regex: search,
                        $options: "i"
                    },
                }
            ]
        })

        if (senteces.length === 0) {
            return res.status(200).json({
                message: `Nenhuma sentença encontrada para a query: ${search}`,
                success: true,
                total: 0,
                senteces: []
            })
        }

        return res.status(200).json({
            message: `Sentencas encontradas para a query: ${search}`,
            success: true,
            total: senteces.length,
            senteces
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar as sentencas.",
            success: false,
            error: error.message
        })
    }
}


export const filterSentences = async (req, res) => {

    const { jlptLevel, difficulty } = req.query;

    if (!jlptLevel && !difficulty) {
        return res.status(400).json({ message: "Pelo menos um filtro deve ser fornecido." });
    }

    try {
        const filter = {
            user: req.user._id
        }

        if (jlptLevel) filter.jlptLevel = jlptLevel;
        if (difficulty) filter.difficulty = difficulty;

        const senteces = await Sentence.find(filter);

        if (senteces.length === 0) {
            return res.status(200).json({
                message: "Nenhuma sentença encontrada com os filtros fornecidos.",
                success: true,
                total: 0,
                senteces: []
            });
        }

        return res.status(200).json({
            message: "Sentencas filtradas com sucesso!",
            success: true,
            total: senteces.length,
            senteces
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar as sentencas.",
            success: false,
            error: error.message
        })
    }
}


export const toggleFavoriteSentence = async (req, res) => {

    const { id } = req.params;

    try {
        const sentence = await Sentence.findOne({
            _id: id,
            user: req.user._id
        })

        if (!sentence) {
            return res.status(404).json({ message: "Sentença nao encontrada." });
        }

        sentence.isFavorite = !sentence.isFavorite;
        await sentence.save();

        return res.status(200).json({
            message: `Sentença ${sentence.japanese} atualizada com sucesso!`,
            success: true,
            sentence
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar a sentença.",
            success: false,
            error: error.message
        })
    }
}


export const reviewSentence = async (req, res) => {

    const { id } = req.params;

    try {
        const sentence = await Sentence.findOne({
            _id: id,
            user: req.user._id
        })

        if (!sentence) {
            return res.status(404).json({ message: "Sentença nao encontrada." });
        }

        sentence.reviewCount++
        sentence.lastReviewedAt = new Date();
        sentence.nextReviewAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

        await sentence.save();

        return res.status(200).json({
            message: `Sentença ${sentence.japanese} atualizada com sucesso!`,
            success: true,
            sentence
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar a sentença.",
            success: false,
            error: error.message
        })
    }
}


export const sentencesToReview = async (req, res) => {

    try {
        const sentences = await Sentence.find({
            user: req.user._id,
            nextReviewAt: { $lte: new Date() }
        })

        if (sentences.length === 0) {
            return res.status(200).json({
                message: "Nenhuma sentença para review encontrada.",
                success: true,
                total: 0,
                sentences: []
            })
        }

        return res.status(200).json({
            message: "Sentencas para review recuperadas com sucesso!",
            success: true,
            total: sentences.length,
            sentences
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar as sentencas para review.",
            success: false,
            error: error.message
        })
    }
}


export const sentencesStats = async (req, res) => {

    try {
        const totalSentences = await Sentence.countDocuments({ user: req.user._id })
        const favoriteSentences = await Sentence.countDocuments({ user: req.user._id, isFavorite: true })
        const sentencesToReview = await Sentence.countDocuments({ user: req.user._id, nextReviewAt: { $lte: new Date() } })

        const sentences = await Sentence.find({ user: req.user._id }, { reviewCount: 1 });
        const totalReviews = sentences.reduce((sum, sentence) => sum + sentence.reviewCount, 0);

        return res.status(200).json({
            success: true,
            message: "Estatísticas recuperadas com sucesso.",
            totalSentences,
            favoriteSentences,
            sentencesToReview,
            totalReviews
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar as estatísticas.",
            success: false,
            error: error.message
        })
    }

}