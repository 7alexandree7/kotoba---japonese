import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { userNotPassword } from "../utils/userNotPassword.js";

export const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;

    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = userNotPassword(user);
        next();
        
    } catch (error) {
        console.log("Error verifying token:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}