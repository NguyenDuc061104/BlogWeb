const siteRouter = require('./siteRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

function route(app){
    app.use('/', siteRouter)
    app.use('/post', postRouter);
    app.use('/user', userRouter);
}

module.exports = route;