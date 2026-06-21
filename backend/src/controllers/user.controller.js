import { User } from "../models/user.model.js";

export const deleteAccount = async (req, res) => {

    try {
        const user = await User.findOneAndDelete({ _id: req.user._id });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        return res.status(200).json({
            message: "Usuário excluído com sucesso!.",
            success: true,
            user: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao excluir o usuário.",
            success: false,
            error: error.message
        });
    }
}