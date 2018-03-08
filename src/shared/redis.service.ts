import { Component } from '@nestjs/common';
import * as redis from 'redis';
import { promisify } from 'util';

export const redisClient = redis.createClient();

export const getAsync = promisify(redisClient.get).bind(redisClient);

@Component()
export class RedisService {
  readonly redisClient: any;
  readonly getAsync: any;

  constructor() {
    this.redisClient = redis.createClient();
    this.getAsync = promisify(redisClient.get).bind(redisClient);
  }

}