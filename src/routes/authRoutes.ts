import { Router } from "express";
import {
  register,
  verify,
  login,
  refreshTokenHandler,
  logout,
  forgotPassword,
  resetPasswordHandler,
} from "../controllers/authController";
import {
  registerValidation,
  verifyOTPValidation,
  loginValidation,
  refreshTokenValidation,
  logoutValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../validators/authValidator";
import { validationResultHandler } from "../middlewares/validationResultHandler";
import {
  otpLimiter,
  registerLimiter,
  loginLimiter,
  refreshTokenLimiter,
  forgotPasswordLimiter,
  passwordResetLimiter,
} from "../middlewares/rateLimiter";

const router = Router();

router.post(
  "/register",
  registerLimiter,
  registerValidation,
  validationResultHandler,
  register
);

router.post(
  "/verify-otp",
  otpLimiter,
  verifyOTPValidation,
  validationResultHandler,
  verify
);

router.post(
  "/login",
  loginLimiter,
  loginValidation,
  validationResultHandler,
  login
);

router.post(
  "/refresh-token",
  refreshTokenLimiter,
  refreshTokenValidation,
  validationResultHandler,
  refreshTokenHandler
);

router.post("/logout", logoutValidation, validationResultHandler, logout);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPasswordValidation,
  validationResultHandler,
  forgotPassword
);

router.post(
  "/reset-password/:resetToken",
  passwordResetLimiter,
  resetPasswordValidation,
  validationResultHandler,
  resetPasswordHandler
);

export default router;
