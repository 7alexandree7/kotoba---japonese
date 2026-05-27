import jwt from "jsonwebtoken";
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";

export const generatetokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, ENV_VARIABLES.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true, // Indica que o cookie deve ser acessado apenas pelo servidor e não por scripts do lado do cliente
        secure: ENV_VARIABLES.NODE_ENV !== "development", // Garante que o cookie seja enviado apenas em conexões seguras (HTTPS) em produção
        sameSite: "strict", // Impede que o cookie seja enviado em requisições cross-site, aumentando a segurança contra ataques CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // Define a duração do cookie para 7 dias
    })
}