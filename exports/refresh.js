import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import refresh from "../exports/conToken.js";

router.post("/", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated!!");
  if (!refresh.refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid");
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, details) => {
    err && console.log(err);

    refresh.refreshTokens = refresh.refreshTokens.filter(
      (token) => token !== refreshToken
    );

    const newAccesToken = generateAccessToken(access.app);
    const newRefreshToken = generateRefreshToken(access.app);
    refresh.ref(newRefreshToken);

    res.status(200).json({
      newAccesToken,
      newRefreshToken,
    });
  });
});

function generateAccessToken(details) {
  return jwt.sign(details, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2min",
  });
}

function generateRefreshToken(details) {
  return jwt.sign(details, process.env.REFRESH_TOKEN_SECRET);
}
export default router;
