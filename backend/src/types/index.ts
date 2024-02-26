import { Schema, Types } from "mongoose";

export const ObjectId = Schema.Types.ObjectId;

export type UserMiddlewareType = {
  id: Types.ObjectId;
};

export * from "./enum";
