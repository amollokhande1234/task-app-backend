import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Token is missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        next();

    } catch (e) {
        return res.status(403).json({
            message: "Unauthorized",
        });
    }
}