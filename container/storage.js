import express from "express";
import cors from "cors";
import token from "../routes/token.js";
import admin from "../routes/admin.js";
import logout from "../routes/logout.js";
import refresh from "../routes/refresh.js";
import user from "../routes//changeUsername.js";
import cookieParser from "cookie-parser";
// import register from "../routes/register.js";

export default function (app) {
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ extended: false }));
  app.use(cookieParser());
  app.use("/token", token);
  app.use("/admin", admin);
  app.use("/logout", logout);
  app.use("/refresh", refresh);
  app.use("/username", user);
  // app.use("/register", register);
}
