import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import Otp from "./otpSchema.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

function sendOTP(otp) {
  return new Promise((resolve, reject) => {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    let details = {
      from: process.env.email,
      to: process.env.email,
      subject: "OTP",
      html: `<p>Your otp verify number:</p>
        <h2>${otp}</h2>
        `,
    };

    mailTransporter.sendMail(details, function (err, info) {
      if (err) {
        console.log(err);
        return reject({ message: "An error has occured" });
      }
      return resolve({ message: "Email sucessfully sent" });
    });
  });
}

router.post("/", async (req, res) => {
  await Otp.deleteMany();
  const OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const gmail = process.env.email;
  sendOTP(OTP);
  const otps = new Otp({ gmail: gmail, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otps.otp = await bcrypt.hash(otps.otp, salt);
  await otps.save();
  return res.status(200).send(gmail);
});

export default router;
