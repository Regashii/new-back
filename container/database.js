require("dotenv").config();
const mongoose = require("mongoose");

module.exports = function () {
  const db = process.env.db;
  mongoose.connect(db).then(() => console.log(`Connected to the database...`));
};
