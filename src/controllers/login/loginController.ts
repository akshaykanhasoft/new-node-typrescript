const express = require('express');
const Cryptr = require('cryptr');
import jwt from 'jsonwebtoken';
import config from '../../config/config';
//const JWT_SECRET = '8ae8224f5f0a59cc91ea3cfa6a272d8598893a3ca51cd6c64d80021ff8567f52863fad083f5746dcce2aa4eb08ff687de2401cc5f0339e9270a01a66b1b54aabf80b51e125b63758fd776cd968acea3c1b7d58bc6da899ea21f02908cece92c3a7ac43682207c2e19c69580f11e9256e0a' // Replace with your secret key
const JWT_SECRET = config.mongo.jwt_secret // Replace with your secret key
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
const cryptr = new Cryptr('myTotallySecretKey');

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("req",req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password both are required.",
                code: 400
            });
        }
        const findUser = await User.findOne({ email, isActive: "T" });
        console.log("res",findUser);
        if (!findUser) {
            return res.status(200).json({
                message: "Invalid email or user is not active",
                code: 400,
            });
        }
        const getPassword = cryptr.decrypt(findUser.password);
        if (password != getPassword) {
            return res.status(200).json({
                message: "Please enter your correct password.",
                code: 400
            });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: findUser._id }, JWT_SECRET, { expiresIn: '1h' });
        //const token = jwt.sign({ userId: findUser._id }, JWT_SECRET, { expiresIn: '30s' });
        return res.status(200).json({
            message: "Login successful.",
            code: 200,
            result: findUser,
            token: token
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
            code: 400
        });
    }
}

export { userLogin }