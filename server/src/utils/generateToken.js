import { JWT_SECRET_KEY } from "../config/jwt.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
    console.log(process.env.ACCESS_TOKEN)
    return jwt.sign(
           payload,
           process.env.ACCESS_TOKEN,
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