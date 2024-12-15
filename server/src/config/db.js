const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const config = require('../config/config');
const { createTable } = require('../utils/sqlFunction');
const userSchema = require('../schemas/userSchema');
const blogSchema = require('../schemas/blogSchema');

// Connect to MySQL
const connectDB = async () => {
  try {
    const pool = mysql.createPool(config);

    pool.getConnection(async (err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
      }
      if (connection) {
        console.log("Connected to MySQL database");
        
        // Create tables after successful connection
        try {
          // Create Users table first because Blog table references it
          await createTable(userSchema);
          console.log('Users table created or already exists');
          
          await createTable(blogSchema);
          console.log('Blogs table created or already exists');
          
          connection.release();
        } catch (error) {
          console.error('Error creating tables:', error);
          connection.release();
        }
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = connectDB;