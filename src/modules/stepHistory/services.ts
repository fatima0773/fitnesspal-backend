// Express Imports
import { Request, Response } from "express";

// Model Imports
import StepHistoryModel, { IUserStepHistory } from "../../models/stepHistory";
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";

/**
 * Get All User's Step Histories by User Id
 * @param { Request } request
 * @param { Response } response
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
 * Get User Step History by User Id and Date
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getStepHistoryForDateService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId, date } = request.params;

    // Check if User Id and Date or Date Range is provided
    if (!userId) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id is required!" });
    }
    if (!date) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "Date is required!" });
    }

    const parsedDate = new Date(date);

    // Get User Step History by Date
    const stepHistory = await StepHistoryModel.findOne({
      userId: userId,
    });

    if (!stepHistory) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History not found!" });
    }

    // Helper function to find an entry by date for calorie and nutrient history
    const findEntryByDate = (entries: IUserStepHistory[], date: Date) => {
      const entry = entries.find(
        (entry) =>
          entry.date.toISOString().split("T")[0] ===
          date.toISOString().split("T")[0]
      );
      return entry || null;
    };

    const entry = findEntryByDate(
      stepHistory.stepHistory,
      parsedDate,
    );
    if (!entry) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History not found for the given date!" });
    }

    response.status(ResponseCode.SUCCESS).json(entry);
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Get User Step History by User Id and Today's Date
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getStepHistoryForTodayService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request.params;

    // Check if User Id and Date or Date Range is provided
    if (!userId) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id is required!" });
    }

    // Get today's date with time set to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the user's step history
    const userStepHistory = await StepHistoryModel.findOne({ userId: userId });

    // Check if the user step history exists
    if (!userStepHistory || !userStepHistory.stepHistory.length) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History not found!" });
    }

    // Sort the stepHistory array by date in descending order and get the latest entry
    const latestStepHistory = userStepHistory.stepHistory
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))[0];

    // Compare the latest entry date with today's date
    const latestEntryDate = new Date(latestStepHistory.date);
    latestEntryDate.setHours(0, 0, 0, 0);

    if (latestEntryDate.getTime() === today.getTime()) {
      // Return the latest step history entry if the dates match
      return response.status(ResponseCode.SUCCESS).json({
        userId: userId,
        stepHistory: latestStepHistory,
      });
    } else {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History for today's date not found!" });
    }
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Get User Step History by User Id and 2 dates
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getStepHistoryForDatesService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId, startdate, enddate } = request.params;

    // Check if User Id and Date Range is provided
    if (!userId || !startdate || !enddate) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id, start date and end date are required!" });
    }

    // Parse the start and end dates
    const start = new Date(startdate);
    const end = new Date(enddate);

    // Get User Step History by  Date Range
    const stepHistory = await StepHistoryModel.findOne({ userId });

    if (!stepHistory) {
      return response
        .status(ResponseCode.NOT_FOUND)
        .json({ error: "Step History not found!" });
    }

    const findEntryByDate = (entries: IUserStepHistory[], date: Date, defaultEntry: IUserStepHistory) => {
      const entry = entries.find(
        (entry) =>
          entry.date.toISOString().split("T")[0] ===
          date.toISOString().split("T")[0]
      );
      return entry || defaultEntry;
    };

    const defaultEntry = {
      date: start,
      currentSteps: 0,
    };

    const startEntry = findEntryByDate(
      stepHistory.stepHistory,
      start,
      defaultEntry as IUserStepHistory
    );

    const endEntry = findEntryByDate(
      stepHistory.stepHistory,
      end,
      defaultEntry as IUserStepHistory
    );

    const responseData = {
      userId: userId,
      startdate: {
        stepHistory: startEntry
      },
      enddate: {
        stepHistory: endEntry
      }
    };

    response.status(ResponseCode.SUCCESS).json(responseData);
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
    const { userId, currentSteps } = request.body;

    // Check if required fields are provided
    if (!userId || !currentSteps) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({
          error: "User Id and Current Steps are required!",
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
      stepGoal: 10000,
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
    let { currentSteps } = request.body;

    // Check if required fields are provided
    if (!userId || !currentSteps) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id and Current Steps are required!" });
    }

    // Parse current steps to integer
    currentSteps = parseInt(currentSteps);

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
      return entry.date.toISOString().split("T")[0] ===
        todayDate.toISOString().split("T")[0];
    });

    // Update current steps for today
    if (todayStepHistoryIndex !== -1) {
      existingRecord.stepHistory[todayStepHistoryIndex].currentSteps += currentSteps || 0;
    } else {
      // Create new entry for today
      const newEntry = {
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

/**
 * Update User Steps
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateStepGoalService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.body.userId;
    let { stepGoal } = request.body;

    // Check if required fields are provided
    if (!userId || !stepGoal) {
      return response
        .status(ResponseCode.BAD_REQUEST)
        .json({ error: "User Id and Step Goal are required!" });
    }

    // Parse current steps to integer
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

    // Update step goal
    existingRecord.stepGoal = stepGoal;

    const updatedStepHistory = await existingRecord.save();
    response.status(ResponseCode.SUCCESS).json(updatedStepHistory);
  } catch (error) {
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// END OF FILE
