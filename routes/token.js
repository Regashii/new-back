const express = require("express");
const collection = require("./server");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const check = await collection.findOne({
      username: username,
      password: password,
    });
    if (check) {
      const user = { details: check };
      const accessToken = generateAccessToken(user);
      res.json({ accessToken: accessToken });
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json(error);
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
}

module.exports = router;
