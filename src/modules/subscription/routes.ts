// Express Imports
import express from "express";
import {
  addCard,
  createSubscriptionDetails,
  getCards,
  getSubscriptionDetails,
  updateCardStatus,
  updateSubscriptionStatus,
} from "./controller";
import { validateCardDetails } from "./middleware";

// Controller Imports

// eslint-disable-next-line new-cap
const subscriptionRoutes = express.Router();

// Nutritional Profile Routes
subscriptionRoutes.get("/get-details/:userId", getSubscriptionDetails);
subscriptionRoutes.post("/create", createSubscriptionDetails);
subscriptionRoutes.get("/get-cards/:userId", getCards);
subscriptionRoutes.put("/add-card", validateCardDetails, addCard);
subscriptionRoutes.put("/update-subscription-status/:userId", updateSubscriptionStatus);
subscriptionRoutes.put("/update-card-status/:userId/:cardId", updateCardStatus);

export default subscriptionRoutes;

// END OF FILE
