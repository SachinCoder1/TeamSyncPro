import mongoose from "mongoose";
import { ObjectId } from "~/types";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    admin: {
      type: ObjectId,
      ref: "User",
    },
    members: [
      {
        type: ObjectId,
        ref: "User",
        index: true,
      },
    ],
    projects: [
      {
        type: ObjectId,
        ref: "Project",
      },
    ],
    invitedMembers: {
      emails: [String],
      users: [{ type: ObjectId, ref: "User" }],
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Workspace = mongoose.model("workspace", workspaceSchema);

export const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  color: String,
  workspace: {
    type: ObjectId,
    ref: "Workspace",
  },
});
export const Tag = mongoose.model("Tag", tagsSchema);
