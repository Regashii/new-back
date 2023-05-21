import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import collection from "./server.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/", async (req, res) => {
  const check = await collection.findOne({ username: req.body.username });

  if (!check) {
    return res.status(404).json("no user found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    check.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json("wrong password");
  }

  const account = {
    message: "Changing account",
  };

  const changeToken = generateAccountToken(account);
  res
    .cookie("change_token", changeToken, {
      httpOnly: true,
    })
    .json("Success");
});

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
          <h2>New Username: ${username}</h2>
          <h2>New Password: ${password}</h2>
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

router.put("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const user = await collection.findOneAndUpdate(
      {},
      { username: username, password: hashedPassword }
    );

    sendDetails(username, password)
      .then((response) =>
        res.status(200).clearCookie("change_token").json(response.message)
      )
      .catch((err) => res.status(500).json(err.message));
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/", authenticateToken, (req, res) => {
  res.status(200).json("succes");
});

function authenticateToken(req, res, next) {
  const authHeader = req.cookies.change_token;
  if (!authHeader) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(authHeader, process.env.CHANGE_TOKEN, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = user;
    next();
  });
}

function generateAccountToken(account) {
  return jwt.sign(account, process.env.CHANGE_TOKEN, { expiresIn: "30min" });
}

export default router;
