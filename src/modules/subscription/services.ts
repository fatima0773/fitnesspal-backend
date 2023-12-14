// Express Imports
import { Request, Response } from "express";

// Model Imports
import SubscriptionDetailModel, {
  ICardDetails,
} from "../../models/subscription";

/**
 * Get Subscription Details
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getSubscriptionDetailService = async (
  request: Request,
  response: Response
) => {
  const userId = request.params.userId;
  try {
    const details = await SubscriptionDetailModel.findOne({ userId });
    response.status(200).json(details);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Create User Nutritional Profile
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const createSubscriptionDetailService = async (
  request: Request,
  response: Response
) => {
  const { userId, card, status } = request.body;
  try {
    const subscription = new SubscriptionDetailModel({
      userId,
      card,
      status,
    });
    await subscription.save();
    response.status(201).json(subscription);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get all Cards
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getCardService = async (request: Request, response: Response) => {
  const userId = request.params.userId;
  try {
    const details = await SubscriptionDetailModel.findOne({ userId });
    if (details) {
      response.status(200).json(details.card);
    } else {
      response.status(404).json({ error: "Subscription details not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Add a New Card
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const addCardService = async (request: Request, response: Response) => {
  const { cardNumber, cvv, expirationDate, userId } = request.body;
  const newCard: ICardDetails = {
    cardNumber,
    cvv,
    expirationDate,
  } as ICardDetails;

  try {
    const details = await SubscriptionDetailModel.findOne({ userId });
    if (details) {
      details.card.push(newCard);
      await details.save();
      response.status(200).json(details.card);
    } else {
      response.status(404).json({ error: "Subscription details not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};
