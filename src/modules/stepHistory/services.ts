// Express Imports
import { Request, Response } from "express";

// Model Imports
import StepHistoryModel, { IUserStepHistory } from "../../models/stepHistory";
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";

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
    const { userId, stepGoal, currentSteps } = request.body;

    // Check if required fields are provided
    if (!userId || !stepGoal || !currentSteps) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({
          error: "User Id, Step Goal and Current Steps are required!",
        });
    }

    // Check if a profile already exists for the given userId
    const existingProfile = await StepHistoryModel.findOne({
      userId: userId,
    });
    if (existingProfile) {
      return response
        .status(400)
        .json({ message: "Step history already exists for this user." });
    }

    // create new Step History
    const newStepHistory = await StepHistoryModel.create({
      userId: userId,
      stepHistory: []
    });

    if (!newStepHistory) {
      response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "Step History not created!" });
    }

    response.status(ResponseCode.CREATED_SUCCESSFULLY).json({
      message: ProfileResponseMessage.PROFILE_CREATED_SUCCESSFUL,
      data: newStepHistory,
    });
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
    const userId = request.body.userId;
    let { currentSteps, stepGoal } = request.body;

    // Check if required fields are provided
    if (!userId || !currentSteps || !stepGoal) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id, Step Goal and Current Steps are required!" });
    }

    // Parse current steps and step goal to integer
    currentSteps = parseInt(currentSteps);
    stepGoal = parseInt(stepGoal);

    // Find Existing Step History By User Id
    const existingRecord = await StepHistoryModel.findOne({
      userId: userId,
    });
    if (!existingRecord) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History not found!" });
    }

    // Get today's date
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

    const todayStepHistoryIndex = existingRecord.stepHistory.findIndex((entry) => {
      return entry.date.getTime() === todayDate.getTime();
    });

    // Update current steps for today
    if (todayStepHistoryIndex !== -1) {
      existingRecord.stepHistory[todayStepHistoryIndex].currentSteps += currentSteps || 0;

      if (existingRecord.stepHistory[todayStepHistoryIndex].stepGoal !== 0) {
        // Check if current steps is between 0 and step goal
        if (currentSteps > existingRecord.stepHistory[todayStepHistoryIndex].stepGoal || currentSteps < 0) {
          return response
            .status(ResponseCode.BAD_REQUEST)
            .json({ error: "Current Steps should be between 0 and Step Goal!" });
        }
      }
    } else {
      // Create new entry for today
      const newEntry = {
        stepGoal: stepGoal || 0,
        currentSteps: currentSteps || 0,
        date: todayDate,
      } as unknown as IUserStepHistory;

      existingRecord.stepHistory.push(newEntry);
    }

    // Update User Steps
    const updatedStepHistory = await existingRecord.save();

    response.status(ResponseCode.SUCCESS).json(updatedStepHistory);
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// END OF FILE
