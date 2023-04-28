import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import refresh from "./conToken.js";

router.get("/", (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json("You log-out");
});

export default router;
