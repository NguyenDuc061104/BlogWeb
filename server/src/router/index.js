const siteRouter = require('server/src/router/siteRouter');
const userRouter = require('server/src/router/userRouter');
const express = require('express');
const router = express.Router();

function route(app){
    app.use('/', siteRouter);
    app.use('/user', userRouter);
}

module.exports = route;