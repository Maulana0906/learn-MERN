import express from "express";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

import {
    getAllUsers,
    registerUser
} from "../models/auth.models.js";

export const loginService = async (data) => {
    try{
        if(data.username==="" || data.password === ""){
            throw new Error("Your data is not complete", {statusCode : 400})
        }
        const users = await getAllUsers();

        const user = users.find((user) => user.username === data.username);

        if(!user){
            throw new Error("User not found", {statusCode : 401})
        }
        const isMatch = await bcrypt.compare(data.password, user.password)

        if(!isMatch){
            throw new Error("Invalid password", {statusCode : 401})
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

// semisal aku logout -> access token expired -> request access token dari refresh token
//  -> lanjut ke logout ->  refresh token di set expired