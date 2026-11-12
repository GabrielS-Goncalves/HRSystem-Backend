import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  surename: { type: String, require: true, trim: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}, {timestamps: true});

export const usersTable = mongoose.model("system_users", userSchema);
