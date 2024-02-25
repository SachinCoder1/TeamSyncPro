import { Request, Response } from "express";
import { errorResponseHandler, successResponseHandler } from "~/utils";

export const MyDetails = (req: Request, res: Response) => {
  try {
    console.log("req.user: ", req.user);
    return successResponseHandler(res, "SUCCESS", {
      user: req?.user || "not found",
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
