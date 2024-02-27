import express from "express";
import { MyDetails } from "~/controller/user";
import {
  createWorkspace, inviteMembers,
} from "~/controller/workspace";
import { authMiddleware } from "~/middleware";
import { validateCreateWorkspaceBody, validateInviteMembersWorkspaceBody } from "~/middleware/schema-validator/workspace";

const router = express.Router();

router.post(
  "/create-workspace",
  validateCreateWorkspaceBody,
  authMiddleware,
  createWorkspace
);


// router.patch("/update-workspace", authMiddleware,)
router.post('/invite-members', validateInviteMembersWorkspaceBody, authMiddleware,inviteMembers )
export default router;
