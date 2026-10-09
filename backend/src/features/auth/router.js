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

router.use(authRouteErrorHandler);

export default router;
