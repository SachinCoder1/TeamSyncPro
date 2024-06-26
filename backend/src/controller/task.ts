// task can be created by just name of it.. just like asana..
// deep nested task can be created using same api by just passing a parentId in the task and it will create new task
// other fields will come by making new api inside it..  there can be one generic api which will accept the values and update it... data will be santized using joi
// let's work hard (so important)

import { Request, Response } from "express";
import { Types } from "mongoose";
import { Comment, Section, Task } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";
import { calculateNewOrder } from "~/utils/calculateOrder";
import { UpdateTaskBody } from "~/types";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, projectId, sectionId } = req.body;

    const lastTaskInSection = await Task.findOne({
      project: projectId,
      section: sectionId,
    })
      .sort({ order: -1 })
      .lean();

    // Determine the order for the new task
    const newOrder = lastTaskInSection ? lastTaskInSection.order + 1 : 1;

    const task = new Task({
      title: title,
      project: projectId,
      section: sectionId,
      order: newOrder,
      taskCreator: req.user?.id,
    });

    await task.save();

    return successResponseHandler(res, "CREATED", { task });
  } catch (error) {
    console.log("err: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  console.log("req.params:", req.params);
  console.log("req.body:", req.body);
  try {
    const { taskId } = req.params;
    const { title, description, priority, storyPoints } =
      req.body as UpdateTaskBody;

    const updateFields: UpdateTaskBody = {
      title,
      description,
      storyPoints,
      priority,
    };

    type updateFieldsKey = keyof typeof updateFields;

    // Remove the fields that are not passed in the request body
    Object.keys(updateFields).forEach(
      (key) =>
        updateFields[key as updateFieldsKey] === undefined &&
        delete updateFields[key as updateFieldsKey]
    );

    const task = await Task.findByIdAndUpdate(taskId, updateFields, {
      new: true,
    }).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const assignTask = async (req: Request, res: Response) => {
  try {
    const { taskId, userId } = req.params;
    if (!taskId || !userId) return errorResponseHandler(res, "BAD_REQUEST");

    const task = await Task.findByIdAndUpdate(
      taskId,
      { assignee: userId },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const unassignTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { assignee: null },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// add a dependency to a task

export const addDependencyToTask = async (req: Request, res: Response) => {
  try {
    const { taskId, dependencyId, dependencyType } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        dependency: {
          by: dependencyType,
          task: dependencyId,
        },
      },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// remove a dependency from a task

export const removeDependencyFromTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { dependency: null },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// due date of a task

export const addDueDateToTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { dueDate } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { due: dueDate },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// remove due date from a task

export const removeDueDateFromTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { due: null },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// update the order of a task

export const reorderTask = async (req: Request, res: Response) => {
  try {
    const { taskId, beforeTaskId, afterTaskId } = req.body;

    const beforeTask = beforeTaskId
      ? await Task.findById(beforeTaskId).lean()
      : null;

    const afterTask = afterTaskId
      ? await Task.findById(afterTaskId).lean()
      : null;

    const newOrder = calculateNewOrder(
      beforeTask ? beforeTask.order : null,
      afterTask ? afterTask.order : null
    );

    const task = await Task.findByIdAndUpdate(
      taskId,
      { order: newOrder },
      { new: true }
    ).lean();

    if (!task) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// copy a task
export const copyTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title } = req.body;

    // Find the original task
    const originalTask = await Task.findById(taskId).lean();
    if (!originalTask) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Get the last task in the section to determine the new order
    const lastTask = await Task.findOne({
      section: originalTask.section,
    }).sort({ order: -1 });

    const newOrder = lastTask ? lastTask.order + 1 : 1;

    // Create a new task based on the original
    const newTaskData = {
      ...originalTask,
      title: title || `${originalTask.title} (Copy)`,
      order: newOrder,
      // Reset fields that should not be copied directly
      likedBy: [],
      comments: [],
      activity: {},
      done: false,
      parentTask: null,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("adding...");

    const newTask = new Task(newTaskData);
    await newTask.save();

    console.log("added...");

    // If the original task is associated with a section, update that section's tasks array
    if (originalTask.section) {
      console.log(
        "updating...",
        originalTask.section,
        "new task id:",
        newTask._id
      );
      await Section.findByIdAndUpdate(originalTask.section, {
        $push: { tasks: newTask._id },
      });
    }

    return successResponseHandler(res, "CREATED", { task: newTask });
  } catch (error) {
    console.log("err: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// sub task

export const createSubTask = async (req: Request, res: Response) => {
  try {
    const { parentTaskId, title } = req.body;

    const parentTask = await Task.findById(parentTaskId).lean();

    if (!parentTask) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const lastSubTask = await Task.findOne({ parentTask: parentTaskId })
      .sort({ order: -1 })
      .lean();

    // Determine the order for the new sub task

    const newOrder = lastSubTask ? lastSubTask.order + 1 : 1;

    const subTask = new Task({
      title,
      parentTask: parentTaskId,
      order: newOrder,
      project: parentTask.project,
      section: parentTask.section,
      taskCreator: req.user?.id,
    });

    await subTask.save();

    return successResponseHandler(res, "CREATED", { subTask });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndDelete(taskId).lean(); // delete the task
    if (!task) return errorResponseHandler(res, "NOT_FOUND");

    return successResponseHandler(res, "DELETED", {
      task: task?._id,
      title: task?.title,
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const markTaskAsComplete = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { done: true },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const markTaskAsIncomplete = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { done: false },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const changeTaskStatus = async (req: Request, res: Response) => {
  try {
    const { sectionId, taskId } = req.params;

    const section = await Section.findById(sectionId)
      .select("_id title")
      .lean();

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        section: section?._id,
        status: { title: section?.title, sectionId: section?._id },
      },
    ).lean();

    await Section.findByIdAndUpdate(task?.section, {
      $pull: { tasks: task?._id },
    });

    await Section.findByIdAndUpdate(sectionId, {
      $addToSet: { tasks: task?._id },
    });

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// like a task
export const likeTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { $addToSet: { likedBy: req.user?.id } },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// unlike a task

export const unlikeTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { likedBy: req.user?.id } },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// add a comment to a task

export const addCommentToTask = async (req: Request, res: Response) => {
  try {
    const { taskId, comment } = req.body;

    const newComment = new Comment({
      comment,
      task: taskId,
      user: req.user?.id,
    });

    const savedComment = await newComment.save();

    const task = await Task.findByIdAndUpdate(taskId, {
      $push: { comments: savedComment._id },
    }).lean();

    return successResponseHandler(res, "UPDATED", {
      comment: savedComment,
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// delete a comment from a task

export const deleteCommentFromTask = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndDelete(commentId).lean();
    if (!comment) return errorResponseHandler(res, "NOT_FOUND");

    const task = await Task.findByIdAndUpdate(
      comment?.task,
      { $pull: { comments: commentId } },
      { new: true }
    ).lean();

    return successResponseHandler(res, "DELETED", { comment, task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// update comment

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId, comment } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment, edited: true },
      { new: true }
    ).lean();

    return successResponseHandler(res, "UPDATED", { comment: updatedComment });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get a complete task by id

export const getTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).select("-comments").lean();

    if (!task) {
      return errorResponseHandler(res, "NOT_FOUND");
    }
    console.log("task:", task);

    return successResponseHandler(res, "SUCCESS", { task });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all sub tasks of a task

export const getSubTasks = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const subTasks = await Task.find({ parentTask: taskId }).lean();

    return successResponseHandler(res, "SUCCESS", { subTasks });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all comments of a task

export const getCommentsOfTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const comments = await Comment.find({ task: taskId })
      .populate("user", "name profileImage _id")
      .select("-task -__v")
      .sort({ createdAt: -1 })
      .lean();

    return successResponseHandler(res, "SUCCESS", { comments });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all tasks of a project

export const getTasksOfProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId }).lean();

    return successResponseHandler(res, "SUCCESS", { tasks });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all tasks of a section

export const getTasksOfSection = async (req: Request, res: Response) => {
  try {
    const { sectionId } = req.params;

    const tasks = await Task.find({ section: sectionId }).lean();

    return successResponseHandler(res, "SUCCESS", { tasks });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
