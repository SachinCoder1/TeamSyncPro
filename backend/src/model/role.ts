import mongoose from "mongoose";

const userProjectRoleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member", "moderator", "project_manager", "viewer"],
    required: true,
  },
  // Additional fields can be added here as needed, such as permissions
});

export const UserRoles = mongoose.model(
  "UserProjectRole",
  userProjectRoleSchema
);
