import mongoose from "mongoose";
import { ObjectId } from "~/types";

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    project: { type: ObjectId, ref: "Project", required: true },
    tasks: [{ type: ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);

export const Section = mongoose.model("Section", sectionSchema);
