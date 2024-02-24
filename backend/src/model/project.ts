import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema(
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
      },
    ],
    invitedMembers: {
      emails: [String],
      users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    sections: {
      type: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("project", projectSchema);
