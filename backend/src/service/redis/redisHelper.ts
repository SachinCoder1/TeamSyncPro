import { Types } from "mongoose";
import redisClient from ".";

export const redisSet = async (
  key: string,
  value: any,
  expireTime?: number
) => {
  await redisClient.set(key, JSON.stringify(value), "EX", expireTime || 3600); // Expires in 1 hour
};

export const redisSetKeyPair = async (key:string, value: string, expireTime?: number) => {
  await redisClient.set(key, value, "EX", expireTime || 3600); // Expires in 1 hour
}

export const redisGet = async (key: string, parse: boolean = true) : Promise<any> => {
  const value = await redisClient.get(key);
  if (!value) return parse ? [] : null;
  if (parse) return JSON.parse(value) || [];
  return value;
};
