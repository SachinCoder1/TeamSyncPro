import { ENV_TYPE } from "~/types";

export const ENV = process.env.ENV as ENV_TYPE;
export const PORT = process.env.PORT;

export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET;
