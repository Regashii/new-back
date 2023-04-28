const express = require("express");
const cors = require("cors");
const token = require("../routes/token.js");
const admin = require("../routes/admin.js");
const logout = require("../routes/logout.js");
const refresh = require("../routes/refresh.js");
const user = require("../routes/changeUsername.js");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));
  app.use("/token", token);
  app.use("/admin", admin);
  app.use("/logout", logout);
  app.use("/refresh", refresh);
  app.use("/username", user);
};
