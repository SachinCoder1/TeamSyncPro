import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    edited: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
