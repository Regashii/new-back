import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("access_token").status(200).json("You log-out");
});

export default router;
