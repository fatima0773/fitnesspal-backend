/* eslint-disable no-unused-vars */

// Enum for Response Code
export enum ResponseCode {
  SUCCESS = 200,
  CREATED_SUCCESSFULLY = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

// Enum for Auth Response Messages
export enum AuthResponseMessage {
  ERROR = "Something went wrong, please try again",
  SIGNUP_SUCCESS = "User registered successfully",
  SIGNUP_ERROR = "Something went wrong while registering the user, please try again",
  OTP_VERIFICATION_ERROR = "Something went wrong while registering the user, please try again",
  USER_EXISTS = "Email already in use, please try a new email or signin",
  USER_NOT_FOUND = "The user does not exist. Please try with a different email or signup",
  OTP_SUCCESS = "OTP code sent successfully",
  OTP_ERROR = "Error sending OTP code, please try again",
  OTP_VERIFICATION_SUCCESS = "OTP Verified",
  SIGNIN_SUCCESS = "Signin successful",
  SIGNIN_ERROR = "Error signing you in, please try again",
  INVALID_PASSWORD = "The password is incorrect. Please try again or reset your account password",
  RESET_PASSWORD_SUCCESS = "Password successfully reset",
  RESET_PASSWORD_ERROR = "There was some error resetting your password. Please try again",
  NEW_PASSWORD_MISMATCH = "New password can not be same as the old password",
  NO_TOKEN_FOUND = "No authorized token found",
  NO_SECRET_KEY = "Server Error: No secret key found",
  INVALID_TOKEN = "Invalid token",
  OTP_MISMATCH = "The otp you entered is incorrect, please try again",
}

// Enum for Nutritional and HealthProfile Response Messages
export enum ProfileResponseMessage {
  ERROR = "Something went wrong, please try again",
  PROFILE_NOT_FOUND = "Profile not found, please try again",
  PROFILE_FOUND = "Profile found successfully",
  PROFILE_CREATED_SUCCESSFUL = "Profile created successfully",
  PROFILE_CREATED_UNSUCCESSFUL = "Error creating profile, please try again",
}

// END OF FILE
