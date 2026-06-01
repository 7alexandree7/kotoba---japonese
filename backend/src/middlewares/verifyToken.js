import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error verifying token:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}