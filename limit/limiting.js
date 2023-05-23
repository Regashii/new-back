import express from "express";
const router = express.Router();
import Limits from "./ip.js";

router.post("/", async (req, res) => {
  const { ip } = req.body;
  const find = await Limits.findOne({ ipAddress: ip });
  if (!find) {
    const newVisitor = new Limits({
      ipAddress: ip,
      limit: 0,
    });

    await newVisitor.save();
    res.status(201).json("New visitor");
  } else {
    if (find.limit >= 3) {
      res.status(500).json("Sorry no function left");
    } else {
      await Limits.findOneAndUpdate({ ipAddress: ip }, { $inc: { limit: 1 } });
      res.status(200).json("add");
    }
  }
});

export default router;
