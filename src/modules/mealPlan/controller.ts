// Express Imports
import { Request, Response } from "express";

// API Response Enum Imports
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";

// Services Imports
import {
  completeMealService,
  generateMealPlanService,
  getMealPlanService,
} from "./services";

/**
 * Generate Meal Plan
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const generateMealPlan = async (
  request: Request,
  response: Response
) => {
  try {
    return await generateMealPlanService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Get Meal Plan
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getMealPlan = async (request: Request, response: Response) => {
  try {
    return await getMealPlanService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Complete Meal
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const completeMeal = async (request: Request, response: Response) => {
  try {
    return await completeMealService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};
