import { Request, Response } from "express";
import { User } from "~/model";
import {
  errorResponseHandler,
  successResponseHandler,
  encryptedPassword,
  generateAccessToken,
  generateRefreshToken,
  checkPassword,
} from "~/utils";

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
      signupMethod: "EMAIL",
      signupType: "SELF",
    }).save();

    return successResponseHandler(res, "CREATED", {
      user: { email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const loginWithEmail = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const isPasswordCorrect = await checkPassword(
      password,
      user?.password as string
    );
    if (!isPasswordCorrect) return errorResponseHandler(res, "UNAUTHORIZED");

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return successResponseHandler(res, "SUCCESS", {
      user: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        emailVerified: user.emailVerified,
        onboarding: user.onboarding,
      },
      secret_tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
