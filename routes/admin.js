const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.json(req.user);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.json("Unauthorized");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.json("Token is not valid!");
    req.user = user;
    next();
  });
}

module.exports = router;
