import express from "express";
import {
    addCommentToTask,
  addDependencyToTask,
  addDueDateToTask,
  assignTask,
  copyTask,
  createSubTask,
  createTask,
  deleteCommentFromTask,
  deleteTask,
  getCommentsOfTask,
  getSubTasks,
  getTask,
  likeTask,
  markTaskAsComplete,
  markTaskAsIncomplete,
  removeDependencyFromTask,
  removeDueDateFromTask,
  reorderTask,
  unassignTask,
  unlikeTask,
  updateComment,
  updateTask,
} from "~/controller/task";

import { authMiddleware } from "~/middleware";
import {
    validateAddCommentBody,
  validateAddDependencyParam,
  validateCreateSubTaskBody,
  validateCreateTaskBody,
  validateDeleteCommentParam,
  validateDueDateBody,
  validateReOrderTaskBody,
  validateTaskIdParam,
  validateUpdateCommentBody,
  validateUpdateTaskBody,
} from "~/middleware/schema-validator/task";

const router = express.Router();

router.post("/create", validateCreateTaskBody, authMiddleware, createTask);
router.post("/add-comment", validateAddCommentBody, authMiddleware, addCommentToTask);
router.post("/copy/:taskId", validateTaskIdParam, authMiddleware, copyTask);
router.post( "/createSubTask", validateCreateSubTaskBody, authMiddleware, createSubTask);


router.get("/get/:taskId", validateTaskIdParam, authMiddleware, getTask);
router.get("/get-subtask/:taskId", validateTaskIdParam, authMiddleware, getSubTasks);
router.get("/get-comments/:taskId", validateTaskIdParam, authMiddleware, getCommentsOfTask);



router.patch("/update/:taskId",validateTaskIdParam, validateUpdateTaskBody, authMiddleware, updateTask);
router.patch( "/assign/:taskId/:userId", validateTaskIdParam, authMiddleware, assignTask);
router.patch( "/unassign/:taskId", validateTaskIdParam, authMiddleware, unassignTask);
router.patch( "/add-dependency/:taskId/:dependencyId/:dependencyType", validateAddDependencyParam, authMiddleware, addDependencyToTask);
router.patch( "/remove-dependency/:taskId", validateTaskIdParam, authMiddleware, removeDependencyFromTask);
router.patch( "/due/:taskId", validateTaskIdParam, validateDueDateBody, authMiddleware, addDueDateToTask );
router.patch("/remove-due/:ta skId", validateTaskIdParam, authMiddleware, removeDueDateFromTask);
router.patch("/reorder", validateReOrderTaskBody, authMiddleware, reorderTask);
router.patch("/mark-complete/:taskId", validateTaskIdParam, authMiddleware, markTaskAsComplete);
router.patch("/mark-incomplete/:taskId", validateTaskIdParam, authMiddleware, markTaskAsIncomplete);
router.patch("/like/:taskId", validateTaskIdParam, authMiddleware, likeTask);
router.patch("/unlike/:taskId", validateTaskIdParam, authMiddleware, unlikeTask);

router.put("/update-comment", validateUpdateCommentBody, authMiddleware, updateComment)

router.delete("/remove-comment/:commentId", validateDeleteCommentParam, authMiddleware, deleteCommentFromTask);
router.delete("/delete/:taskId", validateTaskIdParam, authMiddleware, deleteTask);

export default router;
