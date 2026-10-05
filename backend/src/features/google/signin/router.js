import express from 'express'

import signin from './signin.js'
import signinCallback from './signin-callback.js'

const signinRouter = express.Router();

signinRouter.get('/', signin);
signinRouter.get('/callback', signinCallback);

export default signinRouter;