const mysql = require('mysql2');
require('dotenv').config();
const config = require('./config');

//connect to MYSQL
const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.log({ error: err.message });
    }
    console.log("Connected to MySQL database");
    connection.release();
  });
};


module.exports = connectDB;