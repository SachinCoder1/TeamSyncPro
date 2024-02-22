import mongoose, { Schema } from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    invitedMembers: {
      emails: [String],
      users: { type: [Schema.Types.ObjectId], ref: "User" },
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    ref: "Workspace",
  },
});
export const Tag = mongoose.model("Tag", tagsSchema);
