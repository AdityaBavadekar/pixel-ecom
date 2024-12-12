import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { authTokenCookie } from "../config/authToken.js";

async function signup(req, res) {
    const { name, password } = req.body;
    var { email } = req.body;
    const userType = req.body.userType || 'Consumer';
    try {
        if (!name || !email || !password) {
            return res.status(400).json({message:"All fields are required"})
        }
        email = email.toLowerCase();
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({message:"User with this email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 17);

        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            userType,
        })

        await user.save();

        // create jwt
        generateTokenAndSetCookie(res, user);

        res.status(200).json({
            user: {
                ...user._doc,
                password: undefined
            }
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error occurred"})
    }
}
async function login(req, res) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({message:"All fields are required"})
        }

        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({message:"Invalid credentials"})
        }

        generateTokenAndSetCookie(res, user);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            error: false,
            message:"Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error occurred"})
    }
}

async function logout(req, res) {
    if (!req.userId) {
        return res.status(400).json({message:"User not logged in"})
    }
    res.clearCookie(authTokenCookie.name);
    res.status(200).json({message:"Logged out successfully"})
}

async function checkAuth(req, res) {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({message:"User not found"})
        }
        
        res.status(200).json({user})
    } catch (error) {
        console.log("Error in checkAuth", error);
        return res.status(500).json({message:"Error occurred"})
    }
}

export { signup, login, logout, checkAuth };