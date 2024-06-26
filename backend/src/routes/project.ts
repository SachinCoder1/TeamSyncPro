import express from "express";
import { ROLES } from "~/constants";
import {
  createProject,
  deleteProject,
  getAllStatuses,
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

router.get("/all-status/:projectId", authMiddleware, getAllStatuses);
router.post(
  "/create",
  validateCreateProjectBody,
  authMiddleware,
  restrictsToWorkspace(ROLES.MEMBER),
  createProject
);
router.patch(
  "/update/:projectId",
  validateUpdateProjectBody,
  authMiddleware,
  restrictsToProject(ROLES.MEMBER),
  updateProject
);
router.delete(
  "/delete/:projectId",
  authMiddleware,
  restrictsToProjectWorkspace(ROLES.ADMIN),
  deleteProject
);

export default router;