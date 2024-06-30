import mongoose from "mongoose";

const Schema = mongoose.Schema;

const starredItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  workspace: { type: Schema.Types.ObjectId, ref: "Workspace", required: false },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: false },
});

export const StarredItem = mongoose.model("StarredItems", starredItemSchema);