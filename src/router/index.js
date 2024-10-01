const siteRouter = require('./siteRouter');
const userRouter = require('./userRouter');
const express = require('express');
const router = express.Router();

function route(app){
    app.use('/', siteRouter);
    app.use('/user', userRouter);
}

module.exports = route;