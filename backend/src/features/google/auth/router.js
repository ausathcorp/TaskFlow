import express from 'express'
import auth from './auth.js'
import authCallback from './auth-callback.js'

let authRouter = express.Router();

authRouter.get('/', auth);
authRouter.get('/callback', authCallback);

export default authRouter;