// subscriptionMiddleware.ts

import { body } from "express-validator";

export const validateCardDetails = [
  body("cardNumber").isCreditCard().withMessage("Invalid credit card number."),
  body("cvv")
    .isLength({ min: 3, max: 4 })
    .isNumeric()
    .withMessage("Invalid CVV."),
  body("expirationDate").isString().withMessage("Invalid expiration date."),
];

// END OF FILE
