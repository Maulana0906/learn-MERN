import { JWT_SECRET_KEY } from "../config/jwt.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
    return jwt.sign(
           payload,
           JWT_SECRET_KEY,
           {expiresIn : "15m"}
       )
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        JWT_SECRET_KEY,
        {expiresIn : "1d"}
    ) 
}