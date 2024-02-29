import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponseHandler } from "~/utils";

export const objectIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

export const validateObjectIDParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = objectIdSchema.validate(req.params.id);

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
