const mongoose = require("mongoose");

const newSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const collection = mongoose.model("collection", newSchema);
module.exports = collection;
