import express from "express";
import { ROLES } from "~/constants";
import {
  createWorkspace, deleteWorkspace,
} from "~/controller/workspace";
import { authMiddleware } from "~/middleware";
import { restrictsToWorkspace } from "~/middleware/roles/restrictsToWorkspace";
import { validateCreateWorkspaceBody } from "~/middleware/schema-validator/workspace";

const router = express.Router();

router.post(
  "/create-workspace",
  validateCreateWorkspaceBody,
  authMiddleware,
  createWorkspace
);

router.delete(
  "/delete-workspace/:workspaceId",
  authMiddleware,
  restrictsToWorkspace(ROLES.ADMIN),
  deleteWorkspace
);


export default router;
