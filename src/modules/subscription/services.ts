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
  const { name, cardNumber, cvv, expirationDate, userId, isActive } = request.body;
  const newCard: ICardDetails = {
    name,
    cardNumber,
    cvv,
    expirationDate,
    isActive,
  } as ICardDetails;
  console.log(newCard);

  try {
    const details = await SubscriptionDetailModel.findOne({ userId });
    console.log(details);
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

/**
 * Update Subscription Status
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateSubscriptionStatusService = async (
  request: Request,
  response: Response
) => {
  const { userId } = request.params;
  const { status } = request.body;

  try {
    await SubscriptionDetailModel.updateOne(
      { userId },
      { $set: { status } }
    );

    response.status(200).json({ message: "Subscription status updated successfully" });
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Update Card Status
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateCardStatusService = async (
  request: Request,
  response: Response
) => {
  const { userId, cardId } = request.params;
  const { isActive } = request.body;

  try {
    // Set all cards' isActive to false
    await SubscriptionDetailModel.updateMany(
      { userId },
      { $set: { "card.$[].isActive": false } }
    );

    // Set isActive to true for the specific card
    await SubscriptionDetailModel.findOneAndUpdate(
      { userId, "card._id": cardId },
      { $set: { "card.$.isActive": isActive } }
    );

    response.status(200).json({
      message: "Card status updated successfully",
    });
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};
