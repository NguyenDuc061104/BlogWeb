const mysql = require('mysql2');
require('dotenv').config();
const config = require('../config/config');

// Connect to MySQL
const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    if (connection) {
      console.log("Connected to MySQL database");
      connection.release();
    }
  });
};

module.exports = connectDB;