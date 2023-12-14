// Express Imports
import { Request, Response } from "express";

// API Response Enum Imports
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";

// Services Imports
import {
  createHealthProfileService,
  getHealthProfileService,
  updateHeightService,
  updateTargetWeightService,
  updateWeightService,
} from "./services";

/**
 * Get User Nutritional Profile
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getHealthProfile = async (
  request: Request,
  response: Response
) => {
  try {
    return await getHealthProfileService(request, response);
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
export const createHealthProfile = async (
  request: Request,
  response: Response
) => {
  try {
    return await createHealthProfileService(request, response);
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
export const updateWeight = async (request: Request, response: Response) => {
  try {
    return await updateWeightService(request, response);
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
export const updateHeight = async (request: Request, response: Response) => {
  try {
    return await updateHeightService(request, response);
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
export const updateTargetWeight = async (
  request: Request,
  response: Response
) => {
  try {
    return await updateTargetWeightService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};
