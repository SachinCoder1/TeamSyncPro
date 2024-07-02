import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponseHandler } from "~/utils";

export const validateCreateSectionBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      title: Joi.string().min(2).required(),
      projectId: Joi.string()
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

export const validateUpdateSectionBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      title: Joi.string().min(2),
      // projectId: Joi.string()
      //   .regex(/^[0-9a-fA-F]{24}$/)
      //   .required(),
    });
    console.log("here in update section")
    const error = schema.validate(data).error;
    if (error) {
      return errorResponseHandler(res, { status: 400, message: error.message });
    }
    next();
  } catch (err) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const validateReOrderSectionBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      sectionId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      beforeSectionId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      afterSectionId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      projectId: Joi.string()
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
