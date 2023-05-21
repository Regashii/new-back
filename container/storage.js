import express from "express";
import cors from "cors";
import login from "../routes/login.js";
import admin from "../routes/admin.js";
import logout from "../routes/logout.js";
import change from "../routes/changeAccount.js";
import cookieParser from "cookie-parser";
import sender from "../emailsender/sender.js";
import otp from "../emailsender/otp.js";
import verify from "../emailsender/otpVerify.js";
import forgot from "../emailsender/otpChange.js";
// import register from "../routes/register.js";
// import refresh from "../routes/refresh.js";

export default function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));
  app.use(cookieParser());
  app.use("/api/login", login);
  app.use("/api/admin", admin);
  app.use("/api/logout", logout);
  app.use("/api/change", change);
  app.use("/api/sender", sender);
  app.use("/api/otp", otp);
  app.use("/api/verify", verify);
  app.use("/api/forgot", forgot);
  // app.use("/register", register);
  // app.use("/refresh", refresh);
}
