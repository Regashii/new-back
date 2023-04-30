import express from "express";
import collection from "./server.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const router = express.Router();
import bcrypt from "bcryptjs";

router.post("/", async (req, res) => {
  try {
    const check = await collection.findOne({ username: req.body.username });

    if (!check) {
      return res.json("no user found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (!isPasswordCorrect) {
      return res.json("wrong password");
    }
    const details = {
      id: check._id,
      username: check.username,
    };
    const accessToken = generateAccessToken(details);
    res.send({ accessToken });
  } catch (error) {
    res.json(error);
  }
});

function generateAccessToken(details) {
  return jwt.sign(details, process.env.ACCESS_TOKEN_SECRET);
}

export default router;
