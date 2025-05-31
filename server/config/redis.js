import Redis from "ioredis";
const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING;
const redis = new Redis(REDIS_CONNECTION_STRING);

export default redis;
