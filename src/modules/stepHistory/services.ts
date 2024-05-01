// Express Imports
import { Request, Response } from "express";

// Model Imports
import StepHistoryModel from "../../models/stepHistory";
import { ResponseCode } from "../../common/apiResponse";

/**
 * Get All User's Step Histories by User Id
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getAllStepHistoriesService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request.params;

    // Check if User Id is provided
    if (!userId) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id is required!" });
    }

    // Get all User's Step Histories
    const stepHistory = await StepHistoryModel.find({
      userId: userId,
    });

    if (!stepHistory) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step Histories not found!" });
    }

    response.status(ResponseCode.SUCCESS).json(stepHistory);
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Get User Step History by User Id and (Date or Date Range)
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getStepHistoryService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId, date, startdate, enddate } = request.params;
    let stepHistory;

    // Check if User Id and Date or Date Range is provided
    if (!userId) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id is required!" });
    }
    if (!date && !startdate && !enddate) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "Date or Date Range is required!" });
    }
    if ((startdate && !enddate) || (!startdate && enddate)) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "Both Start Date and End Date are required!" });
    }

    // Get User Step History by Date or Date Range
    if (startdate && enddate) {
      stepHistory = await StepHistoryModel.find({
        userId: userId,
        date: {
          $gte: Date.parse(startdate),
          $lte: Date.parse(enddate),
        },
      });
    } else if (date) {
      stepHistory = await StepHistoryModel.findOne({
        userId: userId,
        date: Date.parse(date),
      });
    }

    if (!stepHistory) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History not found!" });
    }

    response.status(ResponseCode.SUCCESS).json(stepHistory);
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Create Step History for User
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const createStepHistoryService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId, stepGoal, currentSteps, date } = request.body;

    // Check if required fields are provided
    if (!userId || !stepGoal || !currentSteps || !date) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id, Step Goal, Current Steps and Date are required!" });
    }

    // create new Step History
    const newStepHistory = await StepHistoryModel.create({
      userId,
      stepGoal,
      currentSteps,
      date: Date.parse(date),
    });

    if (!newStepHistory) {
      response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "Step History not created!" });
    }

    response.status(ResponseCode.SUCCESS).json(newStepHistory);
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Update User Steps
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateStepsService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId, date, currentSteps } = request.body;

    // Check if required fields are provided
    if (!userId || !date || !currentSteps) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id, Date and Current Steps are required!" });
    }

    // Find Existing Step History By User Id and Date
    const existingRecord = await StepHistoryModel.findOne({
      userId: userId,
      date: Date.parse(date),
    }).select({ stepGoal: 1 });
    if (!existingRecord) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History not found!" });
    }
    console.log(existingRecord);

    // Check if current steps is between 0 and step goal
    if (currentSteps > existingRecord?.stepGoal || currentSteps < 0) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "Current Steps should be between 0 and Step Goal!" });
    }

    // Update User Steps
    const updatedStepHistory = await StepHistoryModel.findByIdAndUpdate(
      existingRecord?.id,
      { $set: { currentSteps } },
      { new: true }
    );

    if (!updatedStepHistory) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History not found!" });
    }

    response.status(ResponseCode.SUCCESS).json(updatedStepHistory);
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// END OF FILE