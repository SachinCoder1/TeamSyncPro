import { Request, Response } from "express";
import { User } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";

export const MyDetails = async (req: Request, res: Response) => {
  try {
    console.log("req.user: ", req.user);
    const user = await User.findById(req.user?.id);
    return successResponseHandler(res, "SUCCESS", {
      user,
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
