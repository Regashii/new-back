const express = require("express");
const storage = require("./container/storage.js");

const app = express();
const port = 9000;

storage(app);

app.listen(9000, () => {
  console.log(`port running ${port}`);
});
