import express from "express";
import collection from "./server.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const router = express.Router();
import bcrypt from "bcryptjs";

let tokenContainer;

router.post("/", async (req, res) => {
  try {
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
    const details = {
      id: check._id,
      username: check.username,
    };
    const accessToken = generateAccessToken(details);
    tokenContainer = accessToken;
    console.log(req.cookies);
    res.json("Good");
  } catch (error) {
    res.json(error);
  }
});

function generateAccessToken(details) {
  return jwt.sign(details, process.env.ACCESS_TOKEN_SECRET);
}

router.get("/", function (req, res) {
  if (tokenContainer) {
    let COOKIE_OPTIONS = { httpOnly: true, sameSite: "Strict", secure: true };
    res
      .cookie("access_token", tokenContainer, COOKIE_OPTIONS)
      .status(200)
      .send("Hi");
  } else {
    res.clearCookie("access_token").json("nope");
  }
});

// router.get("/", function (req, res) {
//   console.log(req.cookies);
//   let COOKIE_OPTIONS = { httpOnly: true, sameSite: "Strict", secure: true };
//   res.cookie("name", "programming exp", COOKIE_OPTIONS).send("Hi");
// });

export default router;
