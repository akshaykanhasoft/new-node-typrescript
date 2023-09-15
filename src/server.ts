import http from 'http';
import bodyParcer from 'body-parser';
import express from 'express';
import config from '../src/config/config';
//import Route from '../src/routes/User';
import mongoose from 'mongoose';

/** connect to mongoose */
mongoose.connect(config.mongo.url)
.then(result => {
    console.log('connected-here')
})
.catch(error => {
    console.log("error-here-fetch");
})


