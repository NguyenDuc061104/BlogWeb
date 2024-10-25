const siteRouter = require('./siteRouter');
const userRouter = require('./userRouter');
const express = require('express');

function route(app){
    app.use('/', siteRouter);
    app.use('/user', userRouter);
}

module.exports = route;