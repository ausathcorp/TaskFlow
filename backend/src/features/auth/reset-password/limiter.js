import { rateLimit } from 'express-rate-limit'
import { Time } from '../shared/utils/constants.js'
import { authConfig } from '../shared/configs/index.js'

let { limit, window_ms } = authConfig.reset_password.limiter;

export default rateLimit({
    windowMs: Time.MINUTE * window_ms,
    limit,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
    requestPropertyName: 'resetPasswordLimiter',
    message: {
        success: false,
        message: 'Too many request attempts, Try again later'
    }
});