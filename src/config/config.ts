import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'akshaykanhasoft';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'sZ3SsD7XfROQwcK4'
const MONGO_HOST = process.env.MONGO_URL || ''
const FROM_EMAIL = process.env.USER_EMAIL;
const EMAIL_PASS = process.env.USER_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const JWT_SECRET = process.env.JWT_SECRET;


//DATABASE_URL = mongodb+srv://akshaykanhasoft:sZ3SsD7XfROQwcK4@cluster0.ovt61ma.mongodb.net/testDatabase

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    from_email:FROM_EMAIL,
    email_password:EMAIL_PASS,
    email_host:EMAIL_HOST,
    email_port:EMAIL_PORT,    
    jwt_secret: '8ae8224f5f0a59cc91ea3cfa6a272d8598893a3ca51cd6c64d80021ff8567f52863fad083f5746dcce2aa4eb08ff687de2401cc5f0339e9270a01a66b1b54aabf80b51e125b63758fd776cd968acea3c1b7d58bc6da899ea21f02908cece92c3a7ac43682207c2e19c69580f11e9256e0a', // Replace with your secret key,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ovt61ma.mongodb.net/testDatabase`,
    image_url: 'http://localhost:3500/uploads/',
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '3500'

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    mongo: MONGO,
    server: SERVER
}


export default config;