import {jwtConfig} from "../config/jwt.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        jwtConfig.accessSecret,
        {expiresIn : "15s"}
    )
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        jwtConfig.refreshSecret,
        {expiresIn : "1d"}
    ) 
}