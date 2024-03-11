import express from "express";
import { ROLES } from "~/constants";
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
router.post("/add-comment/:projectId", validateAddCommentBody, authMiddleware,restrictsToProject(ROLES.MEMBER), addCommentToTask);
router.post("/copy/:projectId/:taskId", validateTaskIdParam, authMiddleware, restrictsToProject(ROLES.MEMBER), copyTask);
router.post( "/createSubTask/:projectId", validateCreateSubTaskBody, authMiddleware,restrictsToProject(ROLES.MEMBER), createSubTask);


router.get("/get/:projectId/:taskId", validateTaskIdParam, authMiddleware,restrictsToProject(ROLES.MEMBER), getTask);
router.get("/get-subtask/:projectId/:taskId", validateTaskIdParam, authMiddleware,restrictsToProject(ROLES.MEMBER), getSubTasks);
router.get("/get-comments/:projectId/:taskId", validateTaskIdParam, authMiddleware,restrictsToProject(ROLES.MEMBER), getCommentsOfTask);


router.patch("/update/:projectId/:taskId",validateTaskIdParam, validateUpdateTaskBody, authMiddleware,restrictsToProject(ROLES.MEMBER), updateTask);
router.patch( "/assign/:projectId/:taskId/:userId", validateTaskIdParam, authMiddleware,restrictsToProject(ROLES.MEMBER), assignTask);
router.patch( "/unassign/:projectId/:taskId", validateTaskIdParam, authMiddleware,restrictsToProject(ROLES.MEMBER), unassignTask);
router.patch( "/add-dependency/:projectId/:taskId/:dependencyId/:dependencyType", validateAddDependencyParam, authMiddleware,restrictsToProject(ROLES.MEMBER), addDependencyToTask);
router.patch( "/remove-dependency/:projectId/:taskId", validateTaskIdParam, authMiddleware,restrictsToProject(ROLES.MEMBER), removeDependencyFromTask);
router.patch( "/due/:projectId/:taskId", validateTaskIdParam, validateDueDateBody, authMiddleware,restrictsToProject(ROLES.MEMBER), addDueDateToTask );
router.patch("/remove-due/:projectId/:taskId", validateTaskIdParam, authMiddleware, restrictsToProject(ROLES.MEMBER), removeDueDateFromTask);
router.patch("/reorder/:projectId", validateReOrderTaskBody, authMiddleware, restrictsToProject(ROLES.MEMBER), reorderTask);
router.patch("/mark-complete/:projectId/:taskId", validateTaskIdParam, authMiddleware, restrictsToProject(ROLES.MEMBER), markTaskAsComplete);
router.patch("/mark-incomplete/:projectId/:taskId", validateTaskIdParam, authMiddleware, restrictsToProject(ROLES.MEMBER), markTaskAsIncomplete);
router.patch("/like/:projectId/:taskId", validateTaskIdParam, authMiddleware, restrictsToProject(ROLES.MEMBER), likeTask);
router.patch("/unlike/:projectId/:taskId", validateTaskIdParam, authMiddleware, restrictsToProject(ROLES.MEMBER), unlikeTask);

router.put("/update-comment/:projectId", validateUpdateCommentBody, authMiddleware, restrictsToProject(ROLES.MEMBER), updateComment)

router.delete("/remove-comment/:projectId/:commentId", validateDeleteCommentParam, authMiddleware, restrictsToProject(ROLES.MEMBER), deleteCommentFromTask);
router.delete("/delete/:projectId/:taskId", validateTaskIdParam, authMiddleware, restrictsToProject(ROLES.MEMBER), deleteTask);

export default router;
