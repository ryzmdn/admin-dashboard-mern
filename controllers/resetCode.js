const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

require("dotenv").config();

exports.sendResetCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Email not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetCode = code;
    user.resetCodeExpire = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: {
        name: "MERN Auth",
        address: process.env.USER_EMAIL,
      },
      to: email,
      subject: "Do not reply to this email. This verification code will expire in 5 minutes.",
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });

    res.json({ msg: "Verification code has been sent to email" });
  } catch (err) {
    console.error("Error sending reset code:", err);
    res.status(500).json({ msg: "Failed to send code, please try again later" });
  }
};

exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Email not found" });

    const isCodeMatch = user.resetCode === code;
    const isCodeExpired = user.resetCodeExpire < new Date();

    if (!isCodeMatch || isCodeExpired) {
      return res.status(400).json({ msg: "Incorrect or expired code" });
    }

    res.json({ msg: "Code verified successfully" });
  } catch (err) {
    console.error("Error verifying code:", err);
    res.status(500).json({ msg: "Code verification failed" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Email not found" });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetCode = undefined;
    user.resetCodeExpire = undefined;

    await user.save();

    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ msg: "Failed to change password" });
  }
};
