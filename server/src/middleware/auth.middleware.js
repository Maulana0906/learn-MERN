import jwt from "jsonwebtoken";
import {jwtConfig} from "../config/jwt.js";

export const verifyToken = (req,res, next) => {
    const authHeader = req.headers.authorization;   
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success : false,
            message : "Unauthorized"
        })
    }

    const token = authHeader.split(" ")[1];    
    try{
        const decoded = jwt.verify(token, jwtConfig.accessSecret);
        req.user = decoded;
        next()
    }catch(err){ 
        const expT = err.name === "TokenExpiredError";
        return res.status(401).json({
            success : false,
            message: expT ? "Token expired" : "invalid token",
            expired: expT ? true : false
        })
    }

}

