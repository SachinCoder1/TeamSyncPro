import mongoose from "mongoose";
import { ObjectId } from "~/types";

const invitationSchema = new mongoose.Schema(
  {
    invited_from: { type: ObjectId, ref: "User" },
    invited_to: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["WORKSPACE", "PROJECT"],
      default: "WORKSPACE",
    },
    workspace: {
      type: ObjectId,
      ref: "Workspace",
    },
    project: {
      type: ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: ["INVITED", "ACCEPTED", "REJECTED", "EXPIRED"],
      default: "INVITED",
    },
    invitation_token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Invitation = mongoose.model("invitation", invitationSchema);
