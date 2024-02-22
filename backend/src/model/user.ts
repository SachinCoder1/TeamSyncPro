import mongoose, { Schema } from "mongoose";

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
    description: {
      type: String,
      trim: true,
    },
    job: {
      role: String,
      department: String,
    },

    profileImage: String,
    pronoun: String,

    emailVerified: {
      type: String,
      enum: ["NOT_VERIFIED", "VERIFIED"],
      required: true,
    },
    signupType: {
      type: String,
      enum: ["GOOGLE", "EMAIL"],
      required: true,
    },

    workspaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        index: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
