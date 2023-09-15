import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const router = express.Router();
const JWT_SECRET = config.mongo.jwt_secret; // Replace with your secret key

const apiMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication required.',code:401 });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.', code: 403 });
        }
        // req.user = user;
        next();
    });
    // try {
    //     console.log("run-here");
    //     return false;
    //     if (!req.headers.authorization) {
    //         return res.status(400).send({
    //             message: 'session is not valid',
    //         });
    //     }
    //     const authHeader = req.headers.authorization;
    //     const token = authHeader.split(' ')[1];
    //     const tokenData = jwt.verify(token, JWT_SECRET);
    //     //req.userData = tokenData;
    //     console.log("me-here");
    //     next();

    // } catch (error:any) {
    //     return res.status(400).send({
    //         message: error.message,
    //     });
    // }
}

export { apiMiddleware }