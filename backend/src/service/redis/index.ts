import { Redis } from 'ioredis';
const redisClient = new Redis({
    host: 'redis',
    port: 6379,  
}); // default connects to 127.0.0.1:6379


export default redisClient;
export * from './redisHelper'