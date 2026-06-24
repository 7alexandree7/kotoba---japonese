import { User } from "../models/user.model.js";
import { userNotPassword } from "../utils/userNotPassword.js";


export const getMyProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        return res.status(200).json({
            message: "Perfil do usuário encontrado com sucesso.",
            success: true,
            user: userNotPassword(user)
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar o perfil do usuário.",
            success: false,
            error: error.message
        });
    }
}


export const updateProfile = async (req, res) => {

    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { ...req.body }, { returnDocument: "after" });

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json({
            message: "Perfil do usuário atualizado com sucesso.",
            success: true,
            user: userNotPassword(updatedUser)
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar o perfil do usuário.",
            success: false,
            error: error.message
        });
    }
}


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