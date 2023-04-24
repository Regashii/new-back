const express = require("express");
const cors = require("cors");
const token = require("../routes/token.js");
const admin = require("../routes/admin.js");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));
  app.use("/", (req, res) => {
    res.json({ message: "Hello world" });
  });
  app.use("/token", token);
  app.use("/admin", admin);
};
