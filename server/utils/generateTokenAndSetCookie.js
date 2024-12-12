import jwt from "jsonwebtoken"
import { authTokenCookie } from "../config/authToken.js"

export const generateTokenAndSetCookie = (res, user) => {
    const token = jwt.sign({ 
        userId: user._id, 
        userType: user.type 
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    res.cookie(authTokenCookie.name, token, {
        maxAge: authTokenCookie.maxAge
    })
}