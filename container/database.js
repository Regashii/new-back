import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export default function () {
  const db = process.env.db;
  mongoose.connect(db).then(() => console.log(`Connected to the database...`));
}
