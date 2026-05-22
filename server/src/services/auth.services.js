import express from "express";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/generateToken.js";

import {
    getAllUsers,
    registerUser
} from "../models/auth.models.js";

export const loginService = async (data) => {
    try{
        if(data.username==="" || data.password === ""){
            const err = new Error("Your data is not complete")
            err.statusCode = 400;
            throw err
        }
        const users = await getAllUsers();
        const user = users.find((user) => user.username === data.username);

        if(!user){
            const err = new Error("User not found")
            err.statusCode = 401
            throw err
        }
        const isMatch = await bcrypt.compare(data.password, user.password)

        if(!isMatch){
            const err = new Error("Invalid password")
            err.statusCode = 401
            throw err
        }

        const accessToken =  generateAccessToken({id : user.id, username : user.username, role : user.role})
        const refreshToken = generateRefreshToken({id : user.id, username : user.username, role : user.role})

        return {
            accessToken, refreshToken, user
        }
    }catch(err){
        throw err;
    }
}

export const registerService = async (user) => {
    try{
        const username = user.username;
        const password = user.password;
        const role = user.role;
        
        if((!username || username.length < 1) || (!password || password.length < 1) || (!role || role.length < 1)){
            throw new Error("Your data is not complete", {statusCode : 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const createUser = await registerUser({username, password : hashedPassword, role});
        
        return {
            success : true,
            message : "User created successfully",
            data : createUser
        };
    }catch(err){
        throw err;
    }
}

export const newAccessTokenService = (token) => {
    try{
        const newToken = verifyRefreshToken(token)
        if(!newToken){
            const err = new Error("token is not valid")
            err.statusCode = 401;
            throw err;
        }

        const accessToken = generateAccessToken(
            {id : newToken.id, username : newToken.username, role : newToken.role}
        );

        return {
            accessToken
        }

    }catch(err){
        throw(err)
    }
}

// semisal aku logout -> access token expired -> request access token dari refresh token
//  -> lanjut ke logout ->  refresh token di set expired