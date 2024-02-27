import { Schema, Types } from "mongoose";

export const ObjectId = Schema.Types.ObjectId;

export type UserMiddlewareType = {
  id: Types.ObjectId;
};
export const TObjectId = Types.ObjectId;

export * from "./enum";
