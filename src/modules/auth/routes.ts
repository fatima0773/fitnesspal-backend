// Express Imports
import express from "express";

// Controller Imports
import {
  deleteAccount,
  getUserById,
  resetPassword,
  sendResetPasswordOtp,
  sendSignupOtp,
  signin,
  signup,
  updateUserProfile,
  verifyOtp,
} from "./controller";
import {
  validateResetPassword,
  validateSignIn,
  validateSignUp,
} from "./middleware";
import { validateRequest } from "../../common/validationMiddleware";

// eslint-disable-next-line new-cap
const userRoutes = express.Router();

// User Routes
userRoutes.post("/verify-otp", verifyOtp);
userRoutes.post("/send-signup-otp", sendSignupOtp);
userRoutes.post("/signup", validateSignUp, validateRequest, signup);
userRoutes.post("/signin", validateSignIn, validateRequest, signin);
userRoutes.post("/reset-password-otp", validateRequest, sendResetPasswordOtp);
userRoutes.post(
  "/reset-password",
  validateResetPassword,
  validateRequest,
  resetPassword
);
userRoutes.put("/update-profile", updateUserProfile);
userRoutes.get("/:userId", getUserById);
userRoutes.delete("/delete-account/:userId", deleteAccount);

export default userRoutes;

// END OF FILE
