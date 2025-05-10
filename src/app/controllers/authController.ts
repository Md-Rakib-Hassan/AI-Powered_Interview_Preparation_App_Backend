import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import UserModel from "../models/User";
import sendResponse from "../utils/sendResponse";
import bcrypt from "bcryptjs"
import { profile } from "console";


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
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(500).json({ message: "Invalid email or password" });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(500).json({ message: "Invalid email or password" });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login Successful.",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token:generateToken(user._id),
            }
        })
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

const getUserProfile = async (req, res) => {
    
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        sendResponse(res, { statusCode: 200, success: true, message: "User data retrived successfully", data: user });
    }catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export const AuthController = {
    generateToken,
    registerUser,
    loginUser,
    getUserProfile

}