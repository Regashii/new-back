import express from "express";
import cors from "cors";
import login from "../routes/login.js";
import admin from "../routes/admin.js";
import logout from "../routes/logout.js";
import user from "../routes//changeUsername.js";
import cookieParser from "cookie-parser";
// import register from "../routes/register.js";
// import refresh from "../routes/refresh.js";

export default function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));
  app.use(cookieParser());
  app.use("/login", login);
  app.use("/admin", admin);
  app.use("/logout", logout);
  // app.use("/refresh", refresh);
  app.use("/username", user);
  // app.use("/register", register);
}
