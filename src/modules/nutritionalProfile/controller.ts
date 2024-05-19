// Express Imports
import { Request, Response } from "express";

// API Response Enum Imports
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";

// Services Imports
import {
  createNutritionalProfileService,
  getDailyCalorieConsumedService,
  getDailyWaterIntakeService,
  getNutritionalProfileService,
  getWeeklyCalorieConsumedService,
  getWeeklyWaterIntakeService,
  updateBloodProfileService,
  updateCalorieHistoryService,
  updateNutrientHistoryService,
  updateWaterIntakeHistoryService,
} from "./services";

/**
 * Get User Nutritional Profile
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getNutritionalProfile = async (
  request: Request,
  response: Response
) => {
  try {
    return await getNutritionalProfileService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Create User Nutritional Profile
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const createNutritionalProfile = async (
  request: Request,
  response: Response
) => {
  try {
    return await createNutritionalProfileService(request, response);
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
export const updateCalorieHistory = async (
  request: Request,
  response: Response
) => {
  try {
    return await updateCalorieHistoryService(request, response);
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
export const updateWaterIntakeHistory = async (
  request: Request,
  response: Response
) => {
  try {
    return await updateWaterIntakeHistoryService(request, response);
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
export const updateBloodProfile = async (
  request: Request,
  response: Response
) => {
  try {
    return await updateBloodProfileService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Update Nutrient Intake History
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateNutrientHistory = async (
  request: Request,
  response: Response
) => {
  try {
    return await updateNutrientHistoryService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Get daily calorie consumed
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getDailyCalorieConsumed = async (
  request: Request,
  response: Response
) => {
  try {
    return await getDailyCalorieConsumedService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Get weekly calorie consumed
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getWeeklyCalorieConsumed = async (
  request: Request,
  response: Response
) => {
  try {
    return await getWeeklyCalorieConsumedService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Get weekly water intake history
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getWeeklyWaterIntake = async (
  request: Request,
  response: Response
) => {
  try {
    return await getWeeklyWaterIntakeService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Get daily water intake history
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getDailyWaterIntake = async (
  request: Request,
  response: Response
) => {
  try {
    return await getDailyWaterIntakeService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};
