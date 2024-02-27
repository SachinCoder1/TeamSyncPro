import express from "express";
import {
  inviteMembersToProject,
  inviteUsersToWorkspace,
} from "~/controller/invite";
import { authMiddleware } from "~/middleware";
import {
  validateInviteMembersProjectBody,
  validateInviteMembersWorkspaceBody,
} from "~/middleware/schema-validator/workspace";

const router = express.Router();

router.post(
  "/workspace",
  validateInviteMembersWorkspaceBody,
  authMiddleware,
  inviteUsersToWorkspace
);

// router.patch("/update-workspace", authMiddleware,)
router.post(
  "/project",
  validateInviteMembersProjectBody,
  authMiddleware,
  inviteMembersToProject
);
export default router;
