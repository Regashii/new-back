import express from "express";
import jwt from "jsonwebtoken";
import collection from "../routes/server.js";
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.status(200).json(req.user);
});

router.put("/", async (req, res) => {
  const user = await collection.findOne;
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
