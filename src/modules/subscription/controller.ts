// Express Imports
import { Request, Response } from "express";

// API Response Enum Imports
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";
import {
  addCardService,
  createSubscriptionDetailService,
  getCardService,
  getSubscriptionDetailService,
  updateCardStatusService,
  updateSubscriptionStatusService,
} from "./services";

// Services Imports

/**
 * Get Subscription Details
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getSubscriptionDetails = async (
  request: Request,
  response: Response
) => {
  try {
    return await getSubscriptionDetailService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Create Subscription
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const createSubscriptionDetails = async (
  request: Request,
  response: Response
) => {
  try {
    return await createSubscriptionDetailService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Update Calorie History
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getCards = async (request: Request, response: Response) => {
  try {
    return await getCardService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Update Water Intake History
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const addCard = async (request: Request, response: Response) => {
  try {
    return await addCardService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Update Subscription Status
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateSubscriptionStatus = async (
  request: Request,
  response: Response
) => {
  try {
    return await updateSubscriptionStatusService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Update Card Status
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateCardStatus = async (
  request: Request,
  response: Response
) => {
  try {
    return await updateCardStatusService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

