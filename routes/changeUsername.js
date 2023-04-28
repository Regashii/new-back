import express from "express";
import collection from "./server.js";

const router = express.Router();

let change = "";

router.post("/", async (req, res) => {
  const password = req.body.password;
  const changingUser = await collection.findOne({ password: password });
  if (changingUser) {
    res.json("Correct");

    change = changingUser.username;
  } else {
    res.json("Wrong password");
  }
});

router.put("/", async (req, res) => {
  if (change === "") {
    res.json("sorry");
  } else {
    const newUsername = await collection.updateOne(
      { username: change },
      { $set: { username: req.body.username } }
    );
    res.json(newUsername);
    change = "";
  }
});

export default router;
