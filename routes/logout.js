const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
let refresh = require("./conToken.js");

router.post("/", authenticateToken, (req, res) => {
  const refreshToken = req.body.token;
  refresh.refreshTokens = refresh.refreshTokens.filter(
    (token) => token !== refreshToken
  );
  res.status(200).json("You log-out");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json("Unauthorized");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = user;
    next();
  });
}

module.exports = router;
