import express from "express";
import collection from "./server.js";
import bcrypt from "bcryptjs";

const router = express.Router();

let change = "";

router.post("/", async (req, res) => {
  const { password, username } = req.body;
  const changingPass = await collection.findOne({
    username: username,
  });
  if (changingPass) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      changingPass.password
    );
    if (!isPasswordCorrect) {
      return res.json("Wrong password");
    }
    change = changingPass.password;
    res.json("Correct");
  } else {
    res.json("Wrong username");
  }
});

router.put("/", async (req, res) => {
  if (change === "") {
    res.json("sorry");
  } else {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    const newPassword = await collection.updateOne(
      { password: change },
      { $set: { password: hashedPassword } }
    );
    res.json(newPassword);
    change = "";
  }
});

export default router;
