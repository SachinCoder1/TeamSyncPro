import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "~/constants";

export const generateAccessToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "15m",
  });

  return token;
};
export const generateRefreshToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id: id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
