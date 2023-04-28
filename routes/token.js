const express = require("express");
const collection = require("./server");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
let refresh = require("./conToken");
let access = require("./user");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const check = await collection.findOne({
      username: username,
      password: password,
    });
    if (check) {
      access.getAccess(check.username);
      const details = access.app;
      const accessToken = generateAccessToken(details);
      const refreshToken = generateRefreshToken(details);
      refresh.ref(refreshToken);
      res.json({ accessToken, refreshToken });
    } else {
      res.json("Who are you?!?!");
    }
  } catch (error) {
    res.json(error);
  }
});

function generateAccessToken(details) {
  return jwt.sign(details, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2min",
  });
}

function generateRefreshToken(details) {
  return jwt.sign(details, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = router;
