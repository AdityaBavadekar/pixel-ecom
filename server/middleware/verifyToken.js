import jwt from "jsonwebtoken";
import { authTokenCookie } from "../config/authToken.js";

function verifyToken(req, res, next) {
    if (!req.cookies || !req.cookies[authTokenCookie.name]){
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    const token = req.cookies[authTokenCookie.name];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            console.log("Unauthorized -  Invalid token");
            return res.status(401).json({ message: "Unauthorized -  Invalid token" });
        }
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log("Error while verifying token", error);
        return res.status(500).json({ message: "Error occurred" });
    }
}

export { verifyToken };
