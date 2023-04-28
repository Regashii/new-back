import { Schema, model } from "mongoose";

const newSchema = new Schema(
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

const collection = model("collection", newSchema);
export default collection;
