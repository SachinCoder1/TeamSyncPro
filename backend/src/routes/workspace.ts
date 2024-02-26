import express from "express";
import { MyDetails } from "~/controller/user";
import {
  createDefaultWorkspace,
  createWorkspace,
} from "~/controller/workspace";
import { authMiddleware } from "~/middleware";
import { validateCreateWorkspaceBody } from "~/middleware/schema-validator/workspace";

const router = express.Router();

router.post(
  "/create-default-workspace",
  authMiddleware,
  createDefaultWorkspace
);
router.post(
  "/create-workspace",
  validateCreateWorkspaceBody,
  authMiddleware,
  createWorkspace
);
export default router;
