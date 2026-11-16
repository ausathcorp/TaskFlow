import { rateLimit } from 'express-rate-limit'
import { Time } from '../shared/utils/constants.js'
import { authConfig } from '../shared/configs/index.js'

let { limit, window_ms } = authConfig.register.limiter;
export default rateLimit({
    windowMs: Time.MINUTE * window_ms,
    limit,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
    skipSuccessfulRequests: false,
    requestPropertyName: 'registerLimit',
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            success: false,
            message: 'To Many Request, Try again later'
        })
    }
});