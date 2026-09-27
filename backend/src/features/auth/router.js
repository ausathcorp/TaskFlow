import express from 'express'
import authRouteErrorHandler from './error-middleware.js'


import{
    registerValidator,
    registerMiddleware,
    registerLimiter,
    registerController } from './register/index.js'

const router = express.Router();

//Auth Register Route
router.post(
    '/register',
    registerLimiter,
    registerValidator,
    registerMiddleware,
    registerController
);

router.use(authRouteErrorHandler);

export default router;