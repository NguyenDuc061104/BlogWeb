const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const route = require('server/src/router');
const connectDB = require('server/src/config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//connect to db
connectDB();

app.use(session({
    secret: 'process.env.SESSION_KEY',
    resave: false,
    saveUninitialized: false,
}))
//working with passport and session
app.use(passport.initialize());
app.use(passport.session());
//using cors
app.use(cors());
//rest api with json
app.use(express.json());
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
route(app);
//listen localhost
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});