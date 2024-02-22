import mongoose, { Schema } from "mongoose";

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
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    },

    storyPoints: Number,
    description: String,

    parentTask: { type: Schema.Types.ObjectId, ref: "Task" }, // this can be deep nested task so parentTask is just a reference of its parent
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
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
