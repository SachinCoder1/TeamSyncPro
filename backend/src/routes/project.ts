import express from "express";
import {
  createProject,
  deleteProject,
  getProjectDetails,
  updateProject,
} from "~/controller/project";

import { authMiddleware } from "~/middleware";
import { restrictsToProject, restrictsToProjectWorkspace } from "~/middleware/roles/restrictsToProject";
import { restrictsToWorkspace } from "~/middleware/roles/restrictsToWorkspace";
import {
  validateCreateProjectBody,
  validateUpdateProjectBody,
} from "~/middleware/schema-validator/project";

const router = express.Router();

router.get("/:projectId", authMiddleware, restrictsToProjectWorkspace("MEMBER"), getProjectDetails);

router.post(
  "/create",
  validateCreateProjectBody,
  authMiddleware,
  restrictsToWorkspace("MEMBER"),
  createProject
);
router.patch(
  "/update/:projectId",
  validateUpdateProjectBody,
  authMiddleware,
  restrictsToProject("MEMBER"),
  updateProject
);
router.delete(
  "/delete/:projectId",
  authMiddleware,
  restrictsToProjectWorkspace("ADMIN"),
  deleteProject
);

export default router;