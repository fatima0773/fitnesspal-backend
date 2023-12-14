// Express Imports
import { Request, Response } from "express";

// Model Imports
import HealthProfileModel from "../../models/healthProfile";
import { ResponseCode } from "../../common/apiResponse";

/**
 * Get User Health Profile
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getHealthProfileService = async (
  request: Request,
  response: Response
) => {
  try {
    const userProfile = await HealthProfileModel.findOne({
      userId: request.params.userId,
    });
    if (userProfile) {
      response.json(userProfile);
    } else {
      response.status(404).json({ error: "Health profile not found" });
    }
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Create User Health Profile
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const createHealthProfileService = async (
  request: Request,
  response: Response
) => {
  try {
    const newProfile = await HealthProfileModel.create(request.body);
    response.status(ResponseCode.CREATED_SUCCESSFULLY).json(newProfile);
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Update User Weight
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateWeightService = async (
  request: Request,
  response: Response
) => {
  try {
    const { weight, bmi, userId } = request.body;

    const updatedProfile = await HealthProfileModel.findOneAndUpdate(
      { userId: userId },
      { $set: { weight, bmi } },
      { new: true }
    );

    if (updatedProfile) {
      response.json(updatedProfile);
    } else {
      response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Health profile not found" });
    }
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Update User Height
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateHeightService = async (
  request: Request,
  response: Response
) => {
  try {
    const { height, bmi, userId } = request.body;

    const updatedProfile = await HealthProfileModel.findOneAndUpdate(
      { userId: userId },
      { $set: { height, bmi } },
      { new: true }
    );

    if (updatedProfile) {
      response.json(updatedProfile);
    } else {
      response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Health profile not found" });
    }
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Update User Target Weight
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateTargetWeightService = async (
  request: Request,
  response: Response
) => {
  try {
    const { targetWeight, userId } = request.body;

    const updatedProfile = await HealthProfileModel.findOneAndUpdate(
      { userId: userId },
      { $set: { targetWeight } },
      { new: true }
    );

    if (updatedProfile) {
      response.json(updatedProfile);
    } else {
      response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Health profile not found" });
    }
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
