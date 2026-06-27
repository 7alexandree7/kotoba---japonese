import { User } from "../models/user.model.js";
import { userNotPassword } from "../utils/userNotPassword.js";
import bcrypt from "bcryptjs";


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


export const changePassword = async (req, res) => {

    const { password, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "Usuário nao encontrado." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Senha atual incorreta.",
                success: false
            });
        };

        const samePassword = await bcrypt.compare(newPassword, user.password);
        if (samePassword) {
            return res.status(400).json({
                message: "A nova senha deve ser diferente da senha atual.",
                success: false
            });
        };

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: "Senha alterada com sucesso.",
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Erro ao alterar a senha.",
            success: false,
            error: error.message
        });
    }
}