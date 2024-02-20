import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponseHandler } from "~/utils";

export const validateSignupBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().min(3).required(),
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
export const validateLoginBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
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
