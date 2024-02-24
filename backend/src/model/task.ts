import mongoose from "mongoose";
import { ObjectId } from "~/types";

const taskSchema = new mongoose.Schema(
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
    due: {
      from: Date,
      to: Date,
    },
    dependency: {
      by: {
        type: String,
        enum: ["IS_BLOCKED_BY", "BLOCKS"],
      },
      task: {
        type: ObjectId,
        ref: "Task",
      },
    },

    storyPoints: Number,
    description: String,

    parentTask: { type: ObjectId, ref: "Task" }, // this can be deep nested task so parentTask is just a reference of its parent
    tags: [{ type: ObjectId, ref: "Tag" }],
    assignee: { type: ObjectId, ref: "User" },
    likedBy: [{ type: ObjectId, ref: "User" }],
    project: { type: ObjectId, ref: "Project" },
    comments: [{ type: ObjectId, ref: "Comment" }],
    activity: {}, // TODO

    /* Enums  */
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "HIGHEST"],
      default: "LOW",
    },

    status: {
      type: String,
      enum: ["INCOMPLETE", "COMPLETE", "DEFERRED"],
      index: true,
      default: "INCOMPLETE",
    },
    workflow: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
    },
  },
  {
    timestamps: true,
  }
);
export const Task = mongoose.model("Task", taskSchema);
