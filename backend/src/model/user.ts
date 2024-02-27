import mongoose, { Schema } from "mongoose";
import { ObjectId } from "~/types";

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
    selectedWorkspace: ObjectId,

    invitedBy: {
      email: String,
      date: Date,
    },

    signupType: {
      type: String,
      enum: ["INVITED", "SELF"],
    },

    emailVerified: {
      type: String,
      enum: ["NOT_VERIFIED", "VERIFIED"],
      default: "NOT_VERIFIED",
      required: true,
    },
    signupMethod: {
      type: String,
      enum: ["GOOGLE", "EMAIL"],
      required: true,
    },
    onboarding: {
      done: {
        type: Boolean,
        default: false,
        required:true,
      },
      step: {
        type: String,
        enum: [
          "SIGNED_UP",
          "PROFILE_SETUP",
          "WORKSPACE_CREATED",
          "PROJECT_CREATED",
          "SECTION_CREATED",
          "TASK_CREATED",
          "INVITED_PEOPLE_OPTIONAL",
          "COMPLETED",
        ],
        required: true,
        default: "SIGNED_UP",
      },
    },

    workspaces: [
      {
        type: ObjectId,
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