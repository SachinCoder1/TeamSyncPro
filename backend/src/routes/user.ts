import express from "express";
import { MyDetails, getAssignedTasksInSelectedWorkspace, getLikedTasks, getMemberProfile, getStarredProjects, getStarredWorkspaces, getWorkspaces, starProject, starWorkspace, unstarProject, unstarWorkspace } from "~/controller/user";
import { authMiddleware } from "~/middleware";

const router = express.Router();

router.get("/", authMiddleware, MyDetails);
router.get("/getMyTasks", authMiddleware, getAssignedTasksInSelectedWorkspace);
router.get("/getLikedTasks", authMiddleware, getLikedTasks);
router.get("/getMyWorkspaces", authMiddleware, getWorkspaces);
router.get("/getMemberProfile/:id", authMiddleware, getMemberProfile);
router.get("/getStarredProjects", authMiddleware, getStarredProjects);
router.get("/getStarredWorkspaces", authMiddleware, getStarredWorkspaces);
router.patch("/starProject/:projectId", authMiddleware, starProject);
router.patch("/starWorkspace/:workspaceId", authMiddleware, starWorkspace);
router.patch("/unstarWorkspace/:workspaceId", authMiddleware, unstarWorkspace);
export default router;
