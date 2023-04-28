import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.json(req.user);
});

function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = user;
    next();
  });
}

export default router;
