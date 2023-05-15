import express from "express";
const router = express.Router();
import Otp from "./otpSchema.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

router.post("/", async (req, res) => {
  const otpHolder = await Otp.find({
    gmail: process.env.email,
  });

  if (otpHolder.length === 0)
    return res.status(400).send("You use an Expired OTP!");

  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

  if (!validUser) {
    return res.status(500).json("Not match");
  }
  const details = {
    messsage: "Sucess, the otp match",
  };

  const otpToken = generateOtpToken(details);
  res
    .cookie("token", otpToken, {
      httpOnly: true,
      expiresIn: "30sec",
    })
    .json("Success");
});

function generateOtpToken(details) {
  return jwt.sign(details, process.env.otp_token, { expiresIn: "1min" });
}

export default router;
