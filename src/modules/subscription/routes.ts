// Express Imports
import express from "express";
import {
  addCard,
  createSubscriptionDetails,
  getCards,
  getSubscriptionDetails,
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

export default subscriptionRoutes;

// END OF FILE
