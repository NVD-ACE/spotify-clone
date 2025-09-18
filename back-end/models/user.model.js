import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    email: {
      type: String,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
