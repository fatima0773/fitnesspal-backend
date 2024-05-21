// Express Imports
import { Request, Response } from "express";

// API Response Enum Imports
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";

// Services Imports
import {
  createStepHistoryService,
  getAllStepHistoriesService,
  getStepHistoryForDateService,
  getStepHistoryForDatesService,
  getStepHistoryForTodayService,
  updateStepGoalService,
  updateStepsService
} from "./services";

/**
 * Get All Step Histories
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getAllStepHistories = async (
  request: Request,
  response: Response
) => {
  try {
    return await getAllStepHistoriesService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};
/**
 * Get Step History By Date
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getStepHistoryForDate = async (
  request: Request,
  response: Response
) => {
  try {
    return await getStepHistoryForDateService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};
/**
 * Get Step History By Today
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getStepHistoryForToday = async (
  request: Request,
  response: Response
) => {
  try {
    return await getStepHistoryForTodayService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};
/**
 * Get Step History By Dates
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getStepHistoryForDates = async (
  request: Request,
  response: Response
) => {
  try {
    return await getStepHistoryForDatesService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Create Step History
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const createStepHistory = async (
  request: Request,
  response: Response
) => {
  try {
    return await createStepHistoryService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Update Steps
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateSteps = async (request: Request, response: Response) => {
  try {
    return await updateStepsService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};
/**
 * Update Step Goal
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateStepGoal = async (request: Request, response: Response) => {
  try {
    return await updateStepGoalService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

// END OF FILE