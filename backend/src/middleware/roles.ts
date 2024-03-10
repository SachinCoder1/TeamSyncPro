// helper function to check if user has the required role
// paramaters: userId, workspaceId, role

/**
 * we can find the user if user is the admin of the workspace or member of the workspace. same for the project
 * we can also add the roles in the jwt token and check if the user has the required role and if the user changes the workspace or project than we can call the refreshTokenWithNewRole function to update the roles in the jwt token
 * or we can have a different schema for the roles and check if the user has the required role
 * or we can use redis to store the roles of the user and check if the user has the required role
 */

import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Project, User } from "~/model";
import { errorResponseHandler } from "~/utils";
type Role = "ADMIN" | "MEMBER" | "VIEWER";


const restrictsToProject = (role: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const projectId = req.params.projectId;

      if (!projectId)
        return res.status(400).json({ message: "projectId is required" });

      if (role === "ADMIN") {
        const project = await Project.findOne({
          _id: projectId,
          admin: user?.id,
        }).lean();
        if (!project) return errorResponseHandler(res, "FORBIDDEN");
        next();
      }

      const project = await Project.findOne({
        _id: projectId,
        members: { $in: [user?.id] },
      })
        .select("members")
        .lean();

      if (!project) return errorResponseHandler(res, "FORBIDDEN");
      next();
    } catch (error) {
      console.error("error: ", error);
      return errorResponseHandler(res, "SERVER_ERROR");
    }
  };
};
