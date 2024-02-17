import { Request, Response } from "express";
import { User } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";

exports.createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return errorResponseHandler(res, "CONFLICT");
    }

    





    return successResponseHandler(res, "CREATED", {});
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
