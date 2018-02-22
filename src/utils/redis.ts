import * as redis from 'redis';
import { promisify } from 'util';

export const redisClient = redis.createClient();

export const getAsync = promisify(redisClient.get).bind(redisClient);
