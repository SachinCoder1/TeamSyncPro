import mongoose from "mongoose";
import { ObjectId } from "~/types";

const invitationSchema = new mongoose.Schema(
  {
    invited_from: {
      email: String,
      user: { type: ObjectId, ref: "User" },
    },
    invited_to: {
      type: String,
      required: true,
    },
    workspace: {
      type: ObjectId,
      ref: "Workspace",
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
