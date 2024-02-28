import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponseHandler } from "~/utils";

export const validateObjectParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
    for (const param in req.params) {
      const { error } = objectIdSchema.validate(req.params[param]);
      if (error) {
        return errorResponseHandler(res, {
          status: 400,
          message: error.message,
        });
      }
    }

    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
