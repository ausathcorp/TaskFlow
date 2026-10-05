import express from 'express'
import authRouter from './auth/router.js'
import signinRouter from './signin/router.js'

const googleRouter = express.Router();

googleRouter.use('/auth', authRouter)
googleRouter.use('/signin', signinRouter);

export default googleRouter;