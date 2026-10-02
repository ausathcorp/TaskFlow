import { rateLimit } from 'express-rate-limit'
import { Time } from '../shared/utils/constants.js'
import { authConfig } from '../shared/configs/index.js'

let { limit, window_ms } = authConfig.login.limiter;

const loginLimitersConfig = ({
    windowMs: Time.MINUTE * window_ms,
    limit,
    skipSuccessfulRequests: true,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
    message: {
        success: false,
        message: 'Too many login attempts, Try again later'
    }});
    
const ipLimiter = rateLimit({
    ...loginLimitersConfig,
    requestPropertyName: 'loginIpLimiter'
});
    
const userLimiter = rateLimit({
    ...loginLimitersConfig,
    requestPropertyName: 'loginUserLimiter',
    keyGenerator: (req) => req.body.email
});

export const loginLimiter = [ipLimiter, userLimiter]