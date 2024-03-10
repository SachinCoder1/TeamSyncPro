import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import {
  ROLES,
  Role,
  getProjectToWorkspaceKey,
  projectRolesKey,
  workspaceRolesKey,
} from "~/constants";
import { Project } from "~/model";
import redisClient, {
  redisGet,
  redisSet,
  redisSetKeyPair,
} from "~/service/redis";
import { errorResponseHandler } from "~/utils";

// export const restrictsToProject = (requiredRole: Role) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = req.user?.id;
//       if (!userId) return errorResponseHandler(res, "UNAUTHORIZED");
//       const projectId = req.params.projectId || req.body.projectId;
//       if (!projectId) return errorResponseHandler(res, "BAD_REQUEST");

//       // Define the Redis key
//       const projectKey = projectRolesKey(projectId, userId);

//       // Check cache first
//       const cachedProjectRoles = await redisClient.get(projectKey);
//       if (cachedProjectRoles) {
//         const roles = JSON.parse(cachedProjectRoles);
//         if (!roles || !roles.includes(requiredRole)) {
//           return errorResponseHandler(res, "FORBIDDEN");
//         }
//         return next(); // User has the required role, allow access
//       }

//       // If not in cache, check database
//       const project = await Project.findById(projectId)
//         .select("members admin")
//         .lean();
//       if (!project) {
//         return errorResponseHandler(res, "NOT_FOUND");
//       }

//       const isAdmin = project.admin?.equals(userId);
//       const isMember = project.members.includes(userId);

//       if (isAdmin) {
//         // Update cache with Admin role
//         await redisSet(projectKey, ["ADMIN"]);
//       }

//       if (isMember) {
//         // Update cache with Member role
//         redisSet(projectKey, ["MEMBER"]);
//       }

//       if (requiredRole === "ADMIN" && isAdmin) {
//         return next();
//       }

//       if (requiredRole === "MEMBER" && (isAdmin || isMember)) {
//         return next();
//       }

//       return errorResponseHandler(res, "FORBIDDEN");
//     } catch (error) {
//       return errorResponseHandler(res, "SERVER_ERROR");
//     }
//   };
// };

// also add ability to restrict to project workspace admin or member.

export const restrictsToProject =
  (requiredRole: Role) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) return errorResponseHandler(res, "UNAUTHORIZED");

      const projectId = req.params.projectId || req.body.projectId;
      if (!projectId) return errorResponseHandler(res, "BAD_REQUEST");

      const projectKey = projectRolesKey(projectId, userId);

      // Check cache first
      const cachedProjectRoles = await redisClient.get(projectKey);
      if (cachedProjectRoles) {
        const roles: Role[] = JSON.parse(cachedProjectRoles);
        if (roles.includes(requiredRole)) {
          return next(); // User has the required role, allow access
        } else {
          return errorResponseHandler(res, "FORBIDDEN");
        }
      }

      // Cache miss, check database
      const project = await Project.findById(projectId)
        .select("members admin")
        .lean();
      if (!project) return errorResponseHandler(res, "NOT_FOUND");

      // Identify roles
      const roles: Role[] = [];
      if (project.admin?.equals(userId)) roles.push(ROLES.ADMIN);
      if (project.members.some((member) => member.equals(userId)))
        roles.push(ROLES.MEMBER);

      // Update cache with discovered roles
      if (roles.length > 0) {
        await redisSet(projectKey, roles);
      }

      // Final role check to decide access
      if (roles.includes(requiredRole)) {
        return next();
      }

      return errorResponseHandler(res, "FORBIDDEN");
    } catch (error) {
      console.error(error); // Log detailed error for debugging
      return errorResponseHandler(res, "SERVER_ERROR");
    }
  };

// export const restirctsToProjectWorkspace =
//   (requiredRole: Role) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = req.user?.id;
//       if (!userId) return errorResponseHandler(res, "UNAUTHORIZED");
//       const projectId = req.params.projectId || req.body.projectId;
//       if (!projectId) return errorResponseHandler(res, "BAD_REQUEST");

//       // Redis key
//       const projectKey = projectRolesKey(projectId, userId);
//       const workspaceKey = workspaceRolesKey(projectId, userId);

//       // Check cache first
//       const cachedProjectRoles = await redisGet(projectKey);
//       const cachedWorkspaceRoles = await redisGet(workspaceKey);

//       if (cachedProjectRoles || cachedWorkspaceRoles) {
//         const hasRequiredProjectRole =
//           cachedProjectRoles?.includes(requiredRole);
//         const hasRequiredWorkspaceRole =
//           cachedWorkspaceRoles?.includes(requiredRole);

//         if (!hasRequiredProjectRole || !hasRequiredWorkspaceRole) {
//           return errorResponseHandler(res, "FORBIDDEN");
//         }
//         return next(); // User has the required role, allow access
//       }

//       // If not in cache, check database

//       const project = await Project.findById(projectId)
//         .select("admin members workspace")
//         .populate("workspace", "admin members")
//         .lean();

//       if (!project) {
//         return errorResponseHandler(res, "NOT_FOUND");
//       }

//       const isProjectAdmin = project.admin?.equals(userId);
//       const isWorkspaceAdmin = (
//         project?.workspace as { admin?: Types.ObjectId }
//       ).admin?.equals(userId);

//       const isProjectMember = project.members.includes(userId);
//       const isWorkspaceMembr = (
//         project?.workspace as { members?: Types.ObjectId[] }
//       ).members?.includes(userId);

//       if (isProjectAdmin) {
//         await redisSet(projectKey, ["ADMIN MEMBER"]);
//       }

//       if (isWorkspaceAdmin) {
//         await redisSet(workspaceKey, ["ADMIN MEMBER"]);
//       }

//       if (isProjectMember) {
//         await redisSet(projectKey, ["MEMBER"]);
//       }

//       if (isWorkspaceMembr) {
//         await redisSet(workspaceKey, ["MEMBER"]);
//       }

//       if (requiredRole === "ADMIN" && (isProjectAdmin || isWorkspaceAdmin)) {
//         return next();
//       }

//       if (
//         requiredRole === "MEMBER" &&
//         (isProjectAdmin ||
//           isWorkspaceAdmin ||
//           isProjectMember ||
//           isWorkspaceMembr)
//       ) {
//         return next();
//       }

//       return errorResponseHandler(res, "FORBIDDEN");
//     } catch (error) {
//       return errorResponseHandler(res, "SERVER_ERROR");
//     }
//   };

export const restrictsToProjectWorkspace =
  (requiredRole: Role) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) return errorResponseHandler(res, "UNAUTHORIZED");

      const projectId = req.params.projectId || req.body.projectId;
      if (!projectId) return errorResponseHandler(res, "BAD_REQUEST");

      // Define Redis keys
      const projectKey = projectRolesKey(projectId, userId);
      const workspaceId = await redisGet(getProjectToWorkspaceKey(projectId));
      let workspaceKey = "";
      if (workspaceId) {
        workspaceKey = workspaceRolesKey(workspaceId, userId);
      }

      // Check cache for roles
      const [cachedProjectRoles, cachedWorkspaceRoles] = await Promise.all([
        redisGet(projectKey),
        redisGet(workspaceKey),
      ]);

      // Combine roles from project and workspace for comprehensive check
      const combinedRoles = new Set([
        ...(cachedProjectRoles as Role[]),
        ...(cachedWorkspaceRoles as Role[]),
      ]);

      if (combinedRoles.has(requiredRole)) {
        return next();
      }

      // Cache miss, fetch from database
      const project = await Project.findById(projectId)
        .select("admin members workspace")
        .populate("workspace", "_id, admin members")
        .lean();

      if (!project) return errorResponseHandler(res, "NOT_FOUND");

      let updateRoles: { project: Role[]; workspace: Role[] } = {
        project: [],
        workspace: [],
      };

      // Check admin and member status
      if (project.admin?.equals(userId)) {
        updateRoles.project.push("ADMIN", "MEMBER");
      } else if (project.members.some((member) => member.equals(userId))) {
        updateRoles.project.push("MEMBER");
      }

      const isWorkspaceAdmin = (
        project?.workspace as { admin?: Types.ObjectId }
      ).admin?.equals(userId);
      const isWorkspaceMembr = (
        project?.workspace as { members?: Types.ObjectId[] }
      ).members?.includes(userId);

      if (project.workspace) {
        if (isWorkspaceAdmin) {
          updateRoles.workspace.push("ADMIN", "MEMBER");
        } else if (isWorkspaceMembr) {
          updateRoles.workspace.push("MEMBER");
        }
      }

      if (updateRoles.project.length > 0) {
        await redisSet(projectKey, updateRoles.project);
      }
      if (updateRoles.workspace.length > 0) {
        await redisSet(workspaceKey, updateRoles.workspace);
        await redisSet(
          getProjectToWorkspaceKey(projectId),
          project?.workspace?._id
        );
      }

      // Final role verification after cache update
      if (
        updateRoles.project.includes(requiredRole) ||
        updateRoles.workspace.includes(requiredRole)
      ) {
        return next();
      }

      return errorResponseHandler(res, "FORBIDDEN");
    } catch (error) {
      console.error(error); // Log for debugging
      return errorResponseHandler(res, "SERVER_ERROR");
    }
  };
