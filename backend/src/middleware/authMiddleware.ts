import { NextFunction, Request, Response } from "express";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "~/constants";
import {
  errorResponseHandler,
  generateAccessToken,
  successResponseHandler,
} from "~/utils";
import jwt from "jsonwebtoken";
import { UserMiddlewareType } from "~/types";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized: Token missing");
  }

  try {
    const [bearer, accessToken] = authHeader.split(" ");

    if (bearer !== "Bearer") {
      return errorResponseHandler(res, "UNAUTHORIZED");
    }

    const decoded = jwt.verify(accessToken, JWT_SECRET) as UserMiddlewareType;
    if (!decoded || !decoded.id) return errorResponseHandler(res, "UNAUTHORIZED");
    req.user = decoded;
    next();
  } catch (err: any) {
    console.log("err: ", err);
    if (err.name === "JsonWebTokenError") {
      return errorResponseHandler(res, "UNAUTHORIZED");
    } else if (err.name === "TokenExpiredError") {
      return errorResponseHandler(res, {
        status: 401,
        message: "TOKEN_EXPIRED",
      });
    } else {
      return errorResponseHandler(res, "SERVER_ERROR");
    }
  }
};

export const authRefreshMiddleware = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized: Token missing");
  }

  try {
    const [bearer, refreshToken] = authHeader.split(" ");

    if (bearer !== "Refresh") {
      return errorResponseHandler(res, "UNAUTHORIZED");
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as UserMiddlewareType;
    console.log("decoded: ", decoded);
    const accessToken = generateAccessToken(decoded.id);
    return successResponseHandler(res, "SUCCESS", {
      secret_tokens: { accessToken },
    });
  } catch (err: any) {
    console.log("err: ", err);
    if (err.name === "JsonWebTokenError") {
      return errorResponseHandler(res, "UNAUTHORIZED");
    } else if (err.name === "TokenExpiredError") {
      return errorResponseHandler(res, {
        status: 401,
        message: "TOKEN_EXPIRED",
      });
    } else {
      return errorResponseHandler(res, "SERVER_ERROR");
    }
  }
};
