import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import UserModel from "../models/User";
import sendResponse from "../utils/sendResponse";

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(token);
        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, config.jwt_secret);
            req.user = await UserModel.findById(decoded.id).select("-password");
            next()
        }
        else {
            sendResponse(res, { statusCode: 401, success: false, message: 'You are not authorized',data:[] });
        }
    } catch (err) {
        sendResponse(res,{statusCode:401, success:false, message:"token failed",data:[]})
    }
}

export default protect;