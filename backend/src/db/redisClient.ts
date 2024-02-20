import { Redis } from "ioredis";

const redisClient = new Redis({
  port: 6379, // Default Redis port
  host: "localhost",
  // 'password' field if your Redis has authentication
});

redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => process.exit(1));

module.exports = redisClient;
