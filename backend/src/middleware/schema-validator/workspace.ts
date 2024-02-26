import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponseHandler } from "~/utils";

export const validateCreateWorkspaceBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      name: Joi.string().required().min(2),
      membersEmails: Joi.array().required().items(Joi.string()),
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
