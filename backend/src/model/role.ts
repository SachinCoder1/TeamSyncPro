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
    enum: ["ADMIN", "MEMBER", "MODERATOR", "PROJECT_MANAGER", "VIEWER"],
    required: true,
  },
  // Additional fields can be added here as needed, such as permissions
});

export const UserRoles = mongoose.model(
  "UserProjectRole",
  userProjectRoleSchema
);
