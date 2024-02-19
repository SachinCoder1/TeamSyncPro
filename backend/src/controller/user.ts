import { Request, Response } from "express";
import { User } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";
import { encryptedPassword } from "~/utils/encryptPassword";
import { generateAccessToken, generateRefreshToken } from "~/utils/token";

export const signupWithEmail = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return errorResponseHandler(res, "CONFLICT");
    }

    const hashedPassword = await encryptedPassword(password);

    const newUser = await new User({
      email,
      name,
      password: hashedPassword,
      emailVerified: "NOT_VERIFIED",
      signupType: "EMAIL",
    }).save();

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    return successResponseHandler(res, "CREATED", {
      secret_tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log("erro:", error)
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
