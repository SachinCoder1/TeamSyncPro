import express from "express";
import { ROLES } from "~/constants";
import {
  addSection,
  copySection,
  deleteSection,
  reorderSection,
  updateSection,
} from "~/controller/section";
import { authMiddleware } from "~/middleware";
import { restrictsToProject } from "~/middleware/roles/restrictsToProject";
import { validateObjectIDParam } from "~/middleware/schema-validator/idParam";
import {
  validateCreateSectionBody,
  validateReOrderSectionBody,
  validateUpdateSectionBody,
} from "~/middleware/schema-validator/section";

const router = express.Router();

router.post("/add", validateCreateSectionBody, authMiddleware, restrictsToProject(ROLES.MEMBER), addSection);
router.post("/copy/:projectId/:id", validateObjectIDParam, authMiddleware, restrictsToProject(ROLES.MEMBER), copySection);

router.patch(
  "/update/:id",
  validateUpdateSectionBody,
  validateObjectIDParam,
  authMiddleware,
  // restrictsToProject(ROLES.MEMBER),
  updateSection
); 
router.patch(
  "/reorder",
  validateReOrderSectionBody,
  authMiddleware,
  restrictsToProject(ROLES.MEMBER),
  reorderSection
);

router.delete("/:projectId/:id", validateObjectIDParam, authMiddleware, restrictsToProject(ROLES.ADMIN), deleteSection);

export default router;
