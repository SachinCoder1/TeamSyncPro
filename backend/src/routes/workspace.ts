import express from "express";
import {
  createWorkspace, deleteWorkspace,
} from "~/controller/workspace";
import { authMiddleware } from "~/middleware";
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
  deleteWorkspace
);


export default router;
