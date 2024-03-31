import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "~/constants";

const ACCESS_TOKEN_TIME = 1 * 60 * 60 * 1000  // 1h in milisecond;

const getExpiryDate = (milisecond: number) => {
  return new Date().setTime(new Date().getTime() + milisecond);
};

export const generateAccessToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, expiresIn: getExpiryDate(ACCESS_TOKEN_TIME) };
};
export const generateRefreshToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id: id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
