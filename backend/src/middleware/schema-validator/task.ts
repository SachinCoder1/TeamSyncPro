import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponseHandler } from "~/utils";

export const validateCreateTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      title: Joi.string().min(1).required(),
      projectId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      sectionId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateCreateSubTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      title: Joi.string().min(1).required(),
      parentTaskId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateTaskIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.params;
    const schema = Joi.object({
      taskId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
      projectId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
      sectionId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
export const validateAddDependencyParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.params;
    const schema = Joi.object({
      taskId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      dependencyId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      dependencyType: Joi.string().valid("IS_BLOCKED_BY", "BLOCKS"),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateUpdateTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      title: Joi.string().trim(),
      storyPoints: Joi.number().integer().min(0),
      description: Joi.string().trim(),
      priority: Joi.string().valid("LOW", "MEDIUM", "HIGH", "HIGHEST"),
    }).or("title", "storyPoints", "description", "priority"); // At least one must be present

    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateDueDateBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      dueDate: Joi.date().iso().required().greater("now"),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateReOrderTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      taskId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      beforeTaskId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      afterTaskId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateAddCommentBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("validating comment body", req.body)
    const data = req.body;
    const schema = Joi.object({
      taskId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      comment: Joi.string().required(),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateUpdateCommentBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      commentId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      comment: Joi.string().required(),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateDeleteCommentParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("delete comment", req.params)
    const data = req.params;
    const schema = Joi.object({
      commentId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
