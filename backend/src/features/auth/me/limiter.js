import { rateLimit } from 'express-rate-limit'
import { Time } from '../shared/utils/constants.js'
import { authConfig } from '../shared/configs/index.js'

let { limiter } = authConfig.me;
export default rateLimit({
    windowMs: Time.MINUTE * limiter.window_ms,
    limit: limiter.limit,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
    requestPropertyName: 'meLimit',
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            success: false,
            message: 'To Many Request, Try again later'
        })
    }
});