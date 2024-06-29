import express from "express";
import { ROLES } from "~/constants";
import {
  acceptWorkspaceInvitation,
  checkInvitation,
  getInvites,
  inviteMembersToProject,
  inviteUsersToWorkspace,
} from "~/controller/invite";
import { authMiddleware } from "~/middleware";
import { restrictsToProjectWorkspace } from "~/middleware/roles/restrictsToProject";
import { restrictsToWorkspace } from "~/middleware/roles/restrictsToWorkspace";
import {
  validateInviteMembersProjectBody,
  validateInviteMembersWorkspaceBody,
} from "~/middleware/schema-validator/workspace";

const router = express.Router();

router.post(
  "/workspace",
  validateInviteMembersWorkspaceBody,
  authMiddleware,
  restrictsToWorkspace(ROLES.MEMBER),
  inviteUsersToWorkspace
);
router.get(
  "/:id",
  authMiddleware,
  getInvites
);

// router.patch("/update-workspace", authMiddleware,)
router.post(
  "/project",
  validateInviteMembersProjectBody,
  authMiddleware,
  restrictsToProjectWorkspace(ROLES.MEMBER),
  inviteMembersToProject
);
router.post(
  "/accept",
  authMiddleware,
  acceptWorkspaceInvitation
);
router.get(
  "/check-invite/:invitationToken",
  authMiddleware,
  checkInvitation
);

export default router;
