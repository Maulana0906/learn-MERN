import express from "express";
import {jwtConfig} from "../config/jwt.js";
import {
    loginService,
    registerService,
    newAccessTokenService
} from "../services/auth.services.js";

export const loginController = async (req,res, next) => {
    try{
        const request = await loginService(req.body);
        res.cookie("refreshToken", request.refreshToken, {httpOnly : true})
        res.status(200).json({
            success : true,
            message : "Login successful",
            accessToken : request.accessToken
        });
    } catch(err){
        next(err)
    }
}

export const logoutController = (req,res, next) => {
    try{
        res.cookie("refreshToken", "", {
            httpOnly : true,
            expires : new Date(0)
        })
        res.status(200).json({
            success : true,
            message : "Logout successful"
        });
    } catch(err){
        next(err)
    }
}

export const getMeController = (req, res, next) => {
    try{
        res.status(200).json({
            user : req.user
        })
    }catch(err){
        next(err)
    }
}

export const registerController = async (req, res, next) => {
    try{
        const user = await registerService(req.body)
        res.status(200).json(user) 
    }catch(err){
        next(err)
    }
}

export const newAccessToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    try{
        const request = await newAccessTokenService(refreshToken)
        
        res.status(200).json({
            success : true,
            message : "Login successful",
            accessToken : request.accessToken
        });
    }catch(err){ 
        next(err)
    }
}