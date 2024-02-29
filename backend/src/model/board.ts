import mongoose from "mongoose";
import { ObjectId } from "~/types";

// should we even use this board or not because project can directly ref to section...

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    project: { type: ObjectId, ref: "Project" },
    workspace: { type: ObjectId, ref: "Workspace" },

    
  },
  { timestamps: true }
);

export const Board = mongoose.model("Board", boardSchema);
