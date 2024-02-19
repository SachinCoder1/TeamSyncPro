import mongoose from "mongoose";
import { USER_STATUS_ENUM } from "~/types";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    emailVerified: {
      type: String,
      enum: ["NOT_VERIFIED", "VERIFIED" ],
      required: true,
    },
    signupType: {
      type: String,
      enum: ["GOOGLE", "EMAIL" ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
