import {jwtConfig} from "../config/jwt.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        jwtConfig.accessSecret,
        {expiresIn : "10s"}
    )
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        jwtConfig.refreshSecret,
        {expiresIn : "1d"}
    ) 
}

export const verifyRefreshToken = (token) => {
    const decode = jwt.verify(token, jwtConfig.refreshSecret)
    return decode;
}