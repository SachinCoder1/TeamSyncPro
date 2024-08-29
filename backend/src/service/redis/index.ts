import { Redis } from "ioredis";
import { REDIS_URL } from "~/config";

const redisClient = new Redis({
  host: REDIS_URL.HOST,
  port: REDIS_URL.PORT,
}); // default connects to 127.0.0.1:6379

export default redisClient;
export * from "./redisHelper";
