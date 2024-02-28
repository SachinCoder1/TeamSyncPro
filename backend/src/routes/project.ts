import express from "express";
import {
  createProject,
  deleteProject,
  getProjectDetails,
  updateProject,
} from "~/controller/project";

import { authMiddleware } from "~/middleware";
import {
  validateCreateProjectBody,
  validateUpdateProjectBody,
} from "~/middleware/schema-validator/project";

const router = express.Router();

router.get("/:id", authMiddleware, getProjectDetails)

router.post(
  "/create",
  validateCreateProjectBody,
  authMiddleware,
  createProject
);
router.patch(
  "/update/:projectId",
  validateUpdateProjectBody,
  authMiddleware,
  updateProject
);
router.delete("/delete/:projectId", authMiddleware, deleteProject);

export default router;


// let's test these apis i just made ^

// get the project
