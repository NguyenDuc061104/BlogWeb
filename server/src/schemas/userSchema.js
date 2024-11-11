// Creating user table
const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      newPassword VARCHAR(255),
      name VARCHAR(255) NOT NULL,
      otp VARCHAR(6),
      otpExpiry BIGINT,
      Primary Key (userId),
      resetToken VARCHAR(255),
      resetTokenExpiry BIGINT
  )
`;

module.exports = userSchema;