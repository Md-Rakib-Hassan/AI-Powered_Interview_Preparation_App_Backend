import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import UserModel from "../models/User";
import sendResponse from "../utils/sendResponse";
import bcrypt from "bcryptjs"


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_secret, { expiresIn: '7d' });
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            res.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);
        
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        })
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User Created Successfully.",
            data: user
        })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    
}

const getUserProfile = async (req, res) => {
    
}

export const AuthController = {
    generateToken,
    registerUser,
    loginUser,
    getUserProfile

}