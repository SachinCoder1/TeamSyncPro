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

    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) return errorResponseHandler(res, "UNAUTHORIZED");

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return successResponseHandler(res, "SUCCESS", {
      user: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        emailVerified: user.emailVerified,
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
