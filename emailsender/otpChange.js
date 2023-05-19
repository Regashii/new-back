import express from "express";
import jwt from "jsonwebtoken";
import collection from "../routes/server.js";
import Otp from "./otpSchema.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

function sendDetails(username, password) {
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
      subject: "Reset Password",
      html: `<p>Your new password:</p>
        <h2>Email: ${username}</h2>
        <h2>Password: ${password}</h2>
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

router.get("/", authenticateToken, (req, res) => {
  res.status(200).json(req.user);
});

router.put("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    const user = await collection.findOneAndUpdate(
      {},
      { password: hashedPassword }
    );
    const cheking = await Otp.findOne({});
    if (cheking) {
      await Otp.findOneAndRemove({});
    }

    sendDetails(user.username, req.body.password)
      .then((response) =>
        res.status(200).clearCookie("access_token").json(response.message)
      )
      .catch((err) => res.status(500).json(err.message));
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.cookies.access_token;
  if (!authHeader) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(authHeader, process.env.otp_token, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = user;
    next();
  });
}

export default router;
