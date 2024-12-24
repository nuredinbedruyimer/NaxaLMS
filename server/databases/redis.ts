import Redis from "ioredis";

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis Connected Successfully !");
    return process.env.REDIS_URL;
  } else {
    throw new Error(`Redis Connection Failure !!!`);
  }
};

const redis = new Redis(redisClient());

export default redis;
