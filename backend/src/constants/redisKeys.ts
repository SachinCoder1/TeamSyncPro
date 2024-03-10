import { Types } from "mongoose";

export const projectRolesKey = (
  projectId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  return `projectRoles:${projectId}:user:${userId}`;
};
export const workspaceRolesKey = (
  workspaceId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  return `workspaceRoles:${workspaceId}:user:${userId}`;
};

export const getProjectToWorkspaceKey = (projectId: Types.ObjectId) => {
  return `projectIdToWorkspaceId:${projectId}`;
}
