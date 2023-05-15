import { Schema, model } from "mongoose";

const creatingOtp = new Schema(
  {
    gmail: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 60 } },
  },
  { timestamps: true }
);

const Otp = model("OtpAuth", creatingOtp);
export default Otp;
