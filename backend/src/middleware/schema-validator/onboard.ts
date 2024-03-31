import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponseHandler } from "~/utils";

export const validateOnboardUserBody = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const schema = Joi.object({
        projectName: Joi.string().min(2).required(),
        tasks: Joi.array().items(Joi.string().min(2)).required(),
        sections: Joi.array().items(Joi.string().min(2)).required(),
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