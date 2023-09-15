const express = require('express');
const Cryptr = require('cryptr');
// import { NextFunction } from 'express';
// const User = require('../models/user');
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import mongoose, { mongo } from 'mongoose';
import { mailSendToUser } from '../controllers/sendMail'
import { ObjectId } from 'mongoose-typescript';
//import { imageUpload } from "../middleware/imageUpload";

// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
//const router = express.Router();
const cryptr = new Cryptr('myTotallySecretKey');
//const ObjectId = mongoose.Types.ObjectId;
// const encryptedString = cryptr.encrypt('bacon');
// const decryptedString = cryptr.decrypt(encryptedString);

// console.log(encryptedString); // 2a3260f5ac4754b8ee3021ad413ddbc11f04138d01fe0c5889a0dd7b4a97e342a4f43bb43f3c83033626a76f7ace2479705ec7579e4c151f2e2196455be09b29bfc9055f82cdc92a1fe735825af1f75cfb9c94ad765c06a8abe9668fca5c42d45a7ec233f0
// console.log(decryptedString); // bacon

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    res.header('Access-Control-Allow-Credentials', 'Content-Type');
    try {
        const { first_name, last_name, email, password, address, state, city, zipcode, user_lat, user_lng } = req.body;
        const documentFile = (req as any).file;
        const userModel = new User({
            id: new mongoose.Types.ObjectId(),
            first_name,
            last_name,
            email,
            password: cryptr.encrypt(password),
            address,
            state,
            city,
            zipcode,
            user_lat,
            user_lng,
            profile_pics: documentFile.filename,
            isActive: 'T'
        });

        // Validate the user instance (this will trigger Mongoose's default validation)
        const validationError = userModel.validateSync();
        if (validationError) {
            const errorMessage = validationError.errors[Object.keys(validationError.errors)[0]].message;
            return res.status(400).json({ message: errorMessage, code: 400 });
        }
        await userModel.validate();
        return userModel.save()
            .then((result: any) => {
                if (result.email) {
                    //send mail to user.
                    // const encryptedString = cryptr.encrypt('bacon');
                    const decryptedString = cryptr.decrypt(result.password);
                    mailSendToUser(result);
                }
                return res.status(200).json({
                    user: result,
                    message: "User data save successfully.",
                    code: 200
                });
            })
            .catch((error: any) => {
                res.status(200).json({ error: error.message });
                if (error instanceof mongoose.Error.ValidationError) {
                    // Return the validation error as the response
                    return res.status(400).json({ error: error.message });
                }
            })
    }
    catch (error: any) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: error.errors.email.message, code: 400 });
        } else {
            return res.status(400).json({ message: error, code: 400 });
        }
    }
};

// const getUsersList = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let getUsers = await User.find({isActive:"T"}).sort({ _id: -1 });
//         // getUsers.map((resp:any,index:any) => {
//         //     console.log("resp",resp);
//         //     console.log("index",index);
//         // })
//         return res.status(200).json({ message: "success", code: 200, result: getUsers });
//     } catch (error: any) {
//         return res.status(400).json({ message: error, code: 400 });
//     }
// }

const getUsersList = async (req: Request, res: Response, next: NextFunction) => {
    const query: any = {
        $and: [
            { isActive: "T" }
        ]
    };
    try {        
        if (req.body.first_name != "" && req.body.first_name != null) {
            query.$or = [
                { first_name: { $regex: req.body.first_name, $options: 'i' } },
                { last_name: { $regex: req.body.first_name, $options: 'i' } },
            ];
        }
        if(req.body.stateData != "" && req.body.stateData != null){
            query.$and.push({ state: { $regex: req.body.stateData, $options: 'i' } });
        }
        const results = await User.find(query).sort({ _id: -1 }).exec();
        return res.status(200).json({ message: "success", code: 200, result: results });
    } catch (error: any) {
        return res.status(400).json({ message: error, code: 400 });
    }
}

const getUserInfoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.user_id);
        let getUserInfo = await User.findById(req.body.user_id);
        return res.status(200).json({ message: "success", code: 200, result: getUserInfo });
    } catch (error: any) {
        return res.status(400).json({ message: error, code: 400 });
    }
}

const deleteByIdOrAllDelete = async (req: Request, res: Response, nex: NextFunction) => {
    const targetId = req.body.user_id;
    try {
        console.log(req.body.user_id);
        if (req.body.user_id != "" && req.body.user_id != undefined) {
            //let deleteUser = await User.deleteOne(req.body.user_id)
            let deletUser = await User.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(targetId) }, // Filter criteria for the record you want to update
                { $set: { isActive: "F" } }, // Update operation using the $set operator
                { new: true }
            )
                .then((result: any) => {
                    if (result) {
                        return res.status(200).json({ message: "User deleted succesfully.", code: 200 });
                    } else {
                        return res.status(400).json({ message: "Your data is not updated something went wrong", code: 400 });
                    }
                })
                .catch((err: any) => {
                    return res.status(400).json({ message: "Something went wrong", code: 400, });
                })
        }
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong", code: 400 });
    }
}

export { createUser, getUsersList, getUserInfoById, deleteByIdOrAllDelete };