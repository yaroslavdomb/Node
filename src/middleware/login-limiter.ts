import { RateLimiterMemory } from "rate-limiter-flexible";
import envConfig from "../config/env.config";

export const loginLimiter = new RateLimiterMemory({
  points: envConfig.LOGIN_RETRY_LIMIT,
  duration: envConfig.LOGIN_WINDOW_DURATION,
  blockDuration: envConfig.LOGIN_BLOCK_DURATION
});
