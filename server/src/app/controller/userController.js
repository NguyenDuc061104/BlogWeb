const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const userSchema = require('server/src/schemas/userSchema');
const {createTable, checkRecordExist, insertRecord, updateRecord} = require('server/src/utils/sqlFunction');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const sendOTP = async (email, otp, res) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions =  {
      from:'"ADMIN" <ilovevietnam272@gmail.com>',
      to: `${email}`,
      subject: "OTP",
      text: `Your OTP is ${otp}`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ error: error.message });
    }
  return otp;
};

const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const otp = generateOTP();
  const otpExpiry = Date.now() + 3600000; // 1hour
  const user = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
    name,
    otp,
    otpExpiry,
  };

  try {
    await createTable(userSchema);
    const userAlreadyExists = await checkRecordExist("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      await insertRecord("users", user);
      await sendOTP(email, otp, res);
      res.status(201).json({ message: "User created successfully!, OTP send to your email." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const {email, otp} = req.body;
  if (!email || !otp) {
    res.status(400).json({error: "Email and OTP fields cannot be empty!"});
  }
  try {
    const user = await checkRecordExist('users', 'email', email);
    if (!user) {
      res.status(404).json({error: 'User not found!'});
      return;
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      res.status(401).json({error: 'Invalid or expired OTP!'});
      return;
    }

    await updateRecord('users', {otp: null, otpExpiry: null}, 'email', email);
    res.status(200).json({message: 'OTP verified successfully!'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

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
  if(!email) {
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
      from: '"ADMIN" <ilovevietnam272@gmail.com>',
      to: `${email}`,
      subject: "Password Reset",
      html: `
        <h2>Password Reset</h2>
        <p>Click on the button below to reset your password:</p>
        <a href="http://localhost:3000/reset-password?token=${resetToken}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>It is your code to change a password:</p>
        <p style="font-weight: bold; font-size: 18px;">${resetToken}</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
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
    const {email, password, newPassword, resetToken, resetTokenExpiry} = req.body;
    if(!email  || !newPassword || (!password && !resetToken)){
      res.status(400).json({error: "Email, New Password, and either Current Password or Reset Token fields cannot be empty!!"});
      return;
    }

    try {
      const user = await checkRecordExist("users", "email", email);
      if(!user){
        res.status(404).json({error: "User not found!"});
        return;
      }
      if (resetToken){
        if(user.resetToken !== resetToken || user.resetTokenExpiry < Date.now()){
          res.status(401).json({error: "Invalid or expired reset token!"});
          return;
        }
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          res.status(401).json({error: "Invalid credentials!"});
          return;
        }
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await updateRecord("users", {password: hashedPassword, resetToken: null, resetTokenExpiry: null}, "email", email);
      res.status(200).json({message: "Password updated successfully!"});
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
};

//exports the controller functions
module.exports = {
  register,
  login,
  forgotPassword,
  changePassword,
  verifyOTP,
};