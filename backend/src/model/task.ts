import mongoose from "mongoose";
import { deleteTask } from "~/controller/task";
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
    due: Date,
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
    section: { type: ObjectId, ref: "Section" },
    comments: [{ type: ObjectId, ref: "Comment" }],
    activity: {}, // TODO
    taskCreator: { type: ObjectId, ref: "User" },

    /* Enums  */
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "HIGHEST"],
      default: "LOW",
    },

    status: {
      type: String,
    },
    workflow: {
      type: String,
      default: "DEFAULT",
      enum: [
        "DEFAULT",
        "DO_TODAY",
        "DO_LATER",
        "DO_THIS_WEEK",
        "DO_THIS_MONTH",
      ],
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("section")) {
    const section = await mongoose.model("Section").findById(this.section);
    if (section) {
      this.status = section.title;
    }
  }
  next();
});

export const Task = mongoose.model("Task", taskSchema);
