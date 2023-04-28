const express = require("express");
const { collection } = require("./server");
const router = express.Router();

let change = "";

router.post("/", async (req, res) => {
  const password = req.body;
  const changingUser = await collection.findOne({ password: password });
  if (changingUser) {
    res.json("Correct");
    // change.push(changingUser.username);
    change = changingUser.username;
  } else {
    res.json("Wrong password");
  }
});

// router.put("/", async (req, res) => {
//   if (change === "") {
//     res.json("sorry");
//   } else {
//     const newUsername = await collection.updateOne(
//       { username: change },
//       { $set: { username: req.body } }
//     );
//     res.json(newUsername);
//     change = "";
//   }
// });

module.exports = router;
