import express from "express";
import storage from "./container/storage.js";
import database from "./container/database.js";

const app = express();
const port = 9000;

storage(app);
database();

app.listen(9000, () => {
  console.log(`port running ${port}`);
});
