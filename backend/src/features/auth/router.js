import express from "express";
import authRouteErrorHandler from "./error-middleware.js";

import {
  registerValidator,
  registerMiddleware,
  registerLimiter,
  registerController,
} from "./register/index.js";

import * as login from "./login/index.js";
import * as forgot from "./forgot-password/index.js";
import * as reset from './reset-password/index.js'
import meController from './authentication/meController.js'
import authenticate from './authentication/authenticate.js'

const router = express.Router();

//Auth Register Route
router.post(
  "/register",
  registerLimiter,
  registerValidator,
  registerMiddleware,
  registerController,
);

//Auth Login Route
router.post(
  "/login",
  login.loginLimiter,
  login.loginValidator,
  login.loginMiddleware,
  login.loginController,
);

//Auth Forgot Route
router.post(
  "/forgot-password",
  forgot.forgotLimiter,
  forgot.forgotValidator,
  forgot.forgotMiddleware,
  forgot.forgotController
);

//Auth Reset password route
router.post(
  '/reset-password/:token',
  reset.resetLimiter,
  reset.resetValidator,
  reset.resetMiddleware,
  reset.resetController
);

router.get(
  '/me',
  authenticate(),
  meController
);

router.use(authRouteErrorHandler);

export default router;
