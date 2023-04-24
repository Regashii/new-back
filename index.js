const express = require("express");
const storage = require("./container/storage.js");
const database = require("./container/database.js");

const app = express();
const port = 9000;

app.use("/", (req, res) => {
  res.json({ message: "Hello world" });
});
storage(app);
database();

app.listen(9000, () => {
  console.log(`port running ${port}`);
});
