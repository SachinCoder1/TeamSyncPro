import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponseHandler } from "~/utils";

export const objectIdSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  projectId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});

export const validateObjectIDParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = objectIdSchema.validate(req.params);

    if (error) {
      return errorResponseHandler(res, {
        status: 400,
        message: error.message,
      });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
