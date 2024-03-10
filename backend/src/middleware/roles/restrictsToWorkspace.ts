import { Request, Response, NextFunction } from "express";
import { ROLES, Role, workspaceRolesKey } from "~/constants";
import { Workspace } from "~/model";
import redisClient, { redisSet } from "~/service/redis";
import { errorResponseHandler } from "~/utils";

export const restrictsToWorkspace =
  (requiredRole: Role) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) return errorResponseHandler(res, "UNAUTHORIZED");

      const workspaceId = req.params.workspaceId || req.body.workspaceId;
      if (!workspaceId) return errorResponseHandler(res, "BAD_REQUEST");

      // Define the Redis key
      const cacheKey = workspaceRolesKey(workspaceId, userId);

      // Check cache first
      const cachedRoles = await redisClient.get(cacheKey);
      if (cachedRoles) {
        const roles: Role[] = JSON.parse(cachedRoles);
        if (roles.includes(requiredRole)) {
          return next(); // User has the required role, allow access
        } else {
          return errorResponseHandler(res, "FORBIDDEN");
        }
      }

      // If not in cache, check database
      const workspace = await Workspace.findById(workspaceId)
        .select("members admin")
        .lean();
      if (!workspace) {
        return errorResponseHandler(res, "NOT_FOUND");
      }

      console.log("workspace", workspace)

      const userRoles: Role[] = [];
      if (workspace.admin?.equals(userId)) {
        userRoles.push(ROLES.ADMIN);
      }
      if (workspace.members.some((member) => member.equals(userId))) {
        userRoles.push(ROLES.MEMBER);
      }
      console.log("userRoles", userRoles)

      // Update cache with the roles found
      if (userRoles.length > 0) {
        await redisSet(cacheKey, JSON.stringify(userRoles));
      }

      if (userRoles.includes(requiredRole)) {
        return next();
      }

      return errorResponseHandler(res, "FORBIDDEN");
    } catch (error) {
      console.error(error); // Ensuring errors are logged for debugging
      return errorResponseHandler(res, "SERVER_ERROR");
    }
  };
