import express from "express";
import { ROLES } from "~/constants";
import {
    addCommentToTask,
  addDependencyToTask,
  addDueDateToTask,
  addTag,
  removeTag,
  assignTask,
  changeTaskStatus,
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
import { restrictsToProject } from "~/middleware/roles/restrictsToProject";
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


// for roles.... 
// we can use the same restrictsToProject middleware to check if the user is a member of the project.. we just need to include the projectId in every request.. 

router.post("/create", validateCreateTaskBody, authMiddleware, restrictsToProject(ROLES.MEMBER), createTask);
router.post("/add-comment", validateAddCommentBody, authMiddleware, addCommentToTask);
router.post("/copy/:taskId", validateTaskIdParam, authMiddleware, copyTask);
router.post( "/createSubTask", validateCreateSubTaskBody, authMiddleware, createSubTask);
router.post("/add-tag", authMiddleware, addTag)

router.get("/get/:projectId/:taskId", validateTaskIdParam, authMiddleware,restrictsToProject(ROLES.MEMBER), getTask);
router.get("/get-subtask/:taskId", validateTaskIdParam, authMiddleware, getSubTasks);
router.get("/get-comments/:taskId", validateTaskIdParam, authMiddleware, getCommentsOfTask);


router.patch("/update/:taskId",validateTaskIdParam, validateUpdateTaskBody, authMiddleware, updateTask);
router.patch( "/assign/:taskId/:userId", validateTaskIdParam, authMiddleware, assignTask);
router.patch( "/unassign/:taskId", validateTaskIdParam, authMiddleware, unassignTask);
router.patch( "/add-dependency/:taskId/:dependencyId/:dependencyType", validateAddDependencyParam, authMiddleware, addDependencyToTask);
router.patch( "/remove-dependency/:taskId", validateTaskIdParam, authMiddleware, removeDependencyFromTask);
router.patch( "/due/:taskId", validateTaskIdParam, validateDueDateBody, authMiddleware, addDueDateToTask );
router.patch("/remove-due/:taskId", validateTaskIdParam, authMiddleware, removeDueDateFromTask);
router.patch("/reorder", validateReOrderTaskBody, authMiddleware, reorderTask);
router.patch("/mark-complete/:taskId", validateTaskIdParam, authMiddleware, markTaskAsComplete);
router.patch("/change-status/:sectionId/:taskId", validateTaskIdParam, authMiddleware, changeTaskStatus);
router.patch("/mark-incomplete/:taskId", validateTaskIdParam, authMiddleware,  markTaskAsIncomplete);
router.patch("/like/:taskId", validateTaskIdParam, authMiddleware, likeTask);
router.patch("/unlike/:taskId", validateTaskIdParam, authMiddleware, unlikeTask);
router.patch("/remove-tag/:tagId/:taskId", authMiddleware, removeTag);

router.put("/update-comment", validateUpdateCommentBody, authMiddleware, updateComment)

router.delete("/remove-comment/:commentId", validateDeleteCommentParam, authMiddleware, deleteCommentFromTask);
router.delete("/delete/:taskId", validateTaskIdParam, authMiddleware, deleteTask);

export default router;
