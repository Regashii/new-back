import express from "express";
import bcrypt from "bcryptjs";
import collection from "./server.js";
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newAdmin = new collection({
        username: req.body.username,
        password: hashedPassword,
      });

      await newAdmin.save();
      res.status(201).json("New admin created");
    } else {
      res.status(403).json("Please provide password");
    }
  } catch (error) {
    res.status(500).json(err.message);
  }
});

export default router;
