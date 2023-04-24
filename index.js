const express = require("express");
const token = require("./routes/token.js");
const admin = require("./routes/admin.js");

const app = express();
const port = 9000;

app.use("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.use("/token", token);

app.use("/admin", admin);

app.listen(9000, () => {
  console.log(`port running ${port}`);
});
