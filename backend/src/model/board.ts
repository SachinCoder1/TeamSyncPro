import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
    },
    icon: {
      type: String,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
    },
    sections: {
        type: 
    }
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("project", projectSchema);
