import { Schema, model } from "mongoose";

const address = new Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: { expireAfterSeconds: 86400 },
    },
  },

  {
    timestamps: true,
  }
);

const Limits = model("Limits", address);
export default Limits;
