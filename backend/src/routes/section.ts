import express from "express";
import {
  addSection,
  copySection,
  deleteSection,
  reorderSection,
  updateSection,
} from "~/controller/section";
import { authMiddleware } from "~/middleware";
import { validateObjectIDParam } from "~/middleware/schema-validator/idParam";
import {
  validateCreateSectionBody,
  validateReOrderSectionBody,
  validateUpdateSectionBody,
} from "~/middleware/schema-validator/section";

const router = express.Router();

router.post("/add", validateCreateSectionBody, authMiddleware, addSection);
router.post("/copy/:id", validateObjectIDParam, authMiddleware, copySection);

router.patch(
  "/update/:id",
  validateUpdateSectionBody,
  validateObjectIDParam,
  authMiddleware,
  updateSection
);
router.patch(
  "/reorder",
  validateReOrderSectionBody,
  authMiddleware,
  reorderSection
);

router.delete("/:id", validateObjectIDParam, authMiddleware, deleteSection);

export default router;
