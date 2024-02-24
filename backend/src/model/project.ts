import mongoose from "mongoose";
import { ObjectId } from "~/types";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
    description: String,
    color: String,
    icon: String,

    admin: {
      type: ObjectId,
      ref: "User",
    },
    members: [{ type: ObjectId, ref: "User" }],
    invitedMembers: {
      emails: [String],
      users: [{ type: ObjectId, ref: "User" }],
    },
    sections: [{ type: ObjectId, ref: "Section" }],
    workspace: { type: ObjectId, ref: "Workspace" },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("project", projectSchema);
