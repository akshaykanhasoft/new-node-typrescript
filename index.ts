// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const mongoString = process.env.DATABASE_URL;
// const users = require('./src/controllers/users');

// mongoose.connect(mongoString);
// const database = mongoose.connection;

// database.on('error', (error) => {
//     console.log(error)
// })

// database.once('connected', () => {
//     console.log('Database Connected');
// })

// const app = express();

// app.use(express.json());

// app.use('/api', users)

// app.listen(3000, () => {
//     console.log(`Server Started at ${3000}`)
// })

import http from 'http';
import bodyParcer from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import config from './src/config/config';
//import Route from '../src/routes/User';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { userRoute}  from './src/routes/userRoute'
import cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors());
var path = require('path');
/** connect to mongoose */
mongoose.connect(config.mongo.url)
.then(result => {
    console.log('connected-here')
})
.catch(error => {
    console.log("error-here-fetch");
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const app = express();sss

// app.use(express.json());

// app.use('/api', users)
app.listen(config.server.port, () => {
    console.log(`Server Started at ${config.server.port}`)    
})
app.use(express.json());
/** Routes go here */
//app.use('/api/createUser', userRoute);
//app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/api/', userRoute());