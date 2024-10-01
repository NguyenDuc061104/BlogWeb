const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const userSchema = require('../../schemas/userSchema');
const {createTable, checkRecordExist, insertRecord, updateRecord} = require('../../utils/sqlFunction');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
  };
  try {
    await createTable(userSchema);
    const userAlreadyExists = await checkRecordExist("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      await insertRecord("users", user);
      res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExist("users", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        res.status(200).json({
          userId: existingUser.userId,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.userId),
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const {email} = req.body;
  if(!email){
    res.status(400).json({error: "Email field cannot be empty!"});
    return;
  }
  try{
    const user = await checkRecordExist("users", "email", email);
    if(!user) {
      res.status(404).json({error: "User not found!"});
      return;
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    await updateRecord("users", {resetToken, resetTokenExpiry}, "email", email);
    //Send email with reset token
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `Click on the link to reset your password: http://localhost:3000/reset-password?token=${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({error: error.message});
      } else {
        res.status(200).json({message: "Email sent!"});
      }
    });
  } catch(error) {
    res.status(500).json({error: error.message});
  }
}
const changePassword = async (req, res) => {
    const {email, latestPassword, newPassword} = req.body;
    if(!email || !latestPassword || !newPassword){
      res.status(400).json({error: "Email, Current Password or New Password fields cannot be empty!"});
      return;
    }
    try{
      const user = await checkRecordExist("users", "email", email);
      if(!user){
        res.status(404).json({error: "User not found!"});
        return;
      }
      const passwordMatch = await bcrypt.compare(latestPassword, user.password);
      if(!passwordMatch){
            res.status(401).json({error: "Invalid credentials!"});
            return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await updateRecord("users", {password: hashedPassword}, "email", email);
      res.status(200).json({message: "Password updated successfully!"});
    } catch(error){
      res.status(500).json({error: error.message});
    }
};
//exports the controller functions
module.exports = {
  register,
  login,
  forgotPassword,
  changePassword
};