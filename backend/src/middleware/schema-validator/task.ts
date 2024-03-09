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
      name: Joi.string().min(2).required(),
    //   projectId: Joi.string()
    //     .regex(/^[0-9a-fA-F]{24}$/)
    //     .required(),
      sectionId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      parentTask: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
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
      due: Joi.object({
        from: Joi.date().iso(), // we can remove this from schema because why do we need from date? 
        to: Joi.date().iso().greater(Joi.ref("from")),
      }),
      storyPoints: Joi.number().integer().min(0),
      description: Joi.string().trim(),
      assignee: Joi.string(), // Assuming this is an ID; validate accordingly
      priority: Joi.string().valid("LOW", "MEDIUM", "HIGH", "HIGHEST"),
      status: Joi.string().valid("INCOMPLETE", "COMPLETE", "DEFERRED"),
      workflow: Joi.string(),
    }).or(
      "title",
      "due",
      "storyPoints",
      "description",
      "assignee",
      "priority",
      "status",
      "workflow"
    ); // At least one must be present

    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
