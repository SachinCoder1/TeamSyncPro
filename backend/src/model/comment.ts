import mongoose from "mongoose";
import { ObjectId } from "~/types";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    edited: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
