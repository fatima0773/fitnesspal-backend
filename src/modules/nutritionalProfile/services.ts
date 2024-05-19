// Express Imports
import { Request, Response } from "express";

// Model Imports
import NutritionalProfileModel, {
  ICalorieHistory,
  INutrientHistory,
  IWaterIntakeHistory,
} from "../../models/nutritionalProfile";
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";
// import UserModel from "../../models/user";

/**
 * Get User Nutritional Profile
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getNutritionalProfileService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.params.userId;

    // Find the user's nutritional profile based on userId
    const nutritionalProfile = await NutritionalProfileModel.findOne({
      userId,
    });

    if (!nutritionalProfile) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProfileResponseMessage.PROFILE_NOT_FOUND,
      });
    }

    return response.status(ResponseCode.SUCCESS).json({
      message: ProfileResponseMessage.PROFILE_FOUND,
      data: nutritionalProfile,
    });
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
export const createNutritionalProfileService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId: string = request.body.userId; // Assuming userId is sent in the request body

    // Check if the user with the provided userId exists
    // const existingUser = await UserModel.findOne({ userId });

    // if (!existingUser) {
    //   return response.status(404).json({ message: "User not found." });
    // }

    // Check if a profile already exists for the given userId
    const existingProfile = await NutritionalProfileModel.findOne({
      userId: userId,
    });
    if (existingProfile) {
      return response
        .status(400)
        .json({ message: "Nutritional profile already exists for this user." });
    }

    // Create a new nutritional profile
    const newProfile = {
      userId: userId,
      calorieHistory: [],
      waterIntakeHistory: [],
      bloodProfile: {
        sodium: -1,
        calcium: -1,
        iron: -1,
        cholesterol: -1,
        uricAcid: -1,
        vitaminD: -1,
        vitaminC: -1,
        vitaminB12: -1,
        hemoglobin: -1,
      },
      nutrientHistory: [],
    };

    const createdProfile = await NutritionalProfileModel.create(newProfile);
    response.status(ResponseCode.CREATED_SUCCESSFULLY).json({
      message: ProfileResponseMessage.PROFILE_CREATED_SUCCESSFUL,
      data: createdProfile,
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.PROFILE_CREATED_UNSUCCESSFUL,
    });
  }
};

export const updateCalorieHistoryService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId: string = request.body.userId; // Assuming userId is sent in the request body
    let { consumedCalories, burnedCalories } = request.body;

    // Convert consumedCalories and burnedCalories to numbers
    consumedCalories = parseFloat(consumedCalories);
    burnedCalories = parseFloat(burnedCalories);

    // Find the user's nutritional profile
    const profile = await NutritionalProfileModel.findOne({ userId: userId });

    if (!profile) {
      return response
        .status(404)
        .json({ message: "Nutritional profile not found for this user." });
    }

    // Get today's date
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

    // Check if a calorie history entry already exists for today
    const todayCalorieEntryIndex = profile.calorieHistory.findIndex(
      (entry) => entry.date.getTime() === todayDate.getTime()
    );

    if (todayCalorieEntryIndex !== -1) {
      // If entry exists, update consumed and burned calories
      profile.calorieHistory[todayCalorieEntryIndex].caloriesConsumed +=
        consumedCalories || 0;
      profile.calorieHistory[todayCalorieEntryIndex].caloriesBurned +=
        burnedCalories || 0;
    } else {
      // If entry doesn't exist, create a new entry
      const newCalorieEntry: ICalorieHistory = {
        date: todayDate,
        caloriesConsumed: consumedCalories || 0,
        caloriesBurned: burnedCalories || 0,
      } as unknown as ICalorieHistory;

      profile.calorieHistory.push(newCalorieEntry);
    }

    // Save the updated profile
    const updatedProfile = await profile.save();
    response.status(200).json(updatedProfile);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Update User Water Intake History
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateWaterIntakeHistoryService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId, waterIntake } = request.body;
    // Find the user's nutritional profile
    const profile = await NutritionalProfileModel.findOne({ userId: userId });
    if (!profile) {
      return response
        .status(404)
        .json({ message: "Nutritional profile not found for this user." });
    }

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const intakeEntryIndex = profile.waterIntakeHistory.findIndex(
      (entry) => entry.date.getTime() === todayDate.getTime()
    );
    if (intakeEntryIndex !== -1) {
      // If entry exists, update consumed and burned calories
      profile.waterIntakeHistory[intakeEntryIndex].waterIntake +=
        waterIntake || 0;
    } else {
      // If entry doesn't exist, create a new entry
      const newWaterIntakeHistory: IWaterIntakeHistory = {
        date: todayDate,
        waterIntake: waterIntake || 0,
      } as unknown as IWaterIntakeHistory;

      profile.waterIntakeHistory.push(newWaterIntakeHistory);
    }

    // Save the updated profile
    const updatedProfile = await profile.save();
    response.status(200).json(updatedProfile);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Update User Blood Profile
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateBloodProfileService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId: string = request.body.userId; // Assuming userId is sent in the request body
    const {
      sodium,
      calcium,
      iron,
      cholesterol,
      uricAcid,
      vitaminD,
      vitaminC,
      vitaminB12,
      hemoglobin,
    } = request.body;

    // Find the user's nutritional profile
    const profile = await NutritionalProfileModel.findOne({ userId: userId });

    if (!profile) {
      return response
        .status(404)
        .json({ message: "Nutritional profile not found for this user." });
    }

    // Update blood profile components if passed, otherwise keep existing values
    profile.bloodProfile.sodium =
      sodium !== undefined ? sodium : profile.bloodProfile.sodium;
    profile.bloodProfile.calcium =
      calcium !== undefined ? calcium : profile.bloodProfile.calcium;
    profile.bloodProfile.iron =
      iron !== undefined ? iron : profile.bloodProfile.iron;
    profile.bloodProfile.cholesterol =
      cholesterol !== undefined
        ? cholesterol
        : profile.bloodProfile.cholesterol;
    profile.bloodProfile.uricAcid =
      uricAcid !== undefined ? uricAcid : profile.bloodProfile.uricAcid;
    profile.bloodProfile.vitaminD =
      vitaminD !== undefined ? vitaminD : profile.bloodProfile.vitaminD;
    profile.bloodProfile.vitaminC =
      vitaminC !== undefined ? vitaminC : profile.bloodProfile.vitaminC;
    profile.bloodProfile.vitaminB12 =
      vitaminB12 !== undefined ? vitaminB12 : profile.bloodProfile.vitaminB12;
    profile.bloodProfile.hemoglobin =
      hemoglobin !== undefined ? hemoglobin : profile.bloodProfile.hemoglobin;

    // Save the updated profile
    const updatedProfile = await profile.save();
    response.status(200).json(updatedProfile);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNutrientHistoryService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId, cholesterol, protein, carbs, sodium, fats } = request.body;

    // Validate the date
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // Find the user's nutritional profile
    const profile = await NutritionalProfileModel.findOne({ userId: userId });

    if (!profile) {
      return response
        .status(404)
        .json({ message: "Nutritional profile not found for this user." });
    }

    // Check if a nutrient history entry already exists for the specified date
    const nutrientEntryIndex = profile.nutrientHistory.findIndex(
      (entry) => entry.date.getTime() === todayDate.getTime()
    );

    if (nutrientEntryIndex !== -1) {
      // If entry exists, update nutrient values
      const nutrientEntry = profile.nutrientHistory[nutrientEntryIndex];
      nutrientEntry.cholesterol += cholesterol || nutrientEntry.cholesterol;
      nutrientEntry.protein += protein || nutrientEntry.protein;
      nutrientEntry.carbs += carbs || nutrientEntry.carbs;
      nutrientEntry.sodium += sodium || nutrientEntry.sodium;
      nutrientEntry.fats = fats || nutrientEntry.fats;
    } else {
      // If entry doesn't exist, create a new entry
      const newNutrientEntry: INutrientHistory = {
        date: todayDate,
        cholesterol: cholesterol || 0,
        protein: protein || 0,
        carbs: carbs || 0,
        sodium: sodium || 0,
        fats: fats || 0,
      } as unknown as INutrientHistory;

      profile.nutrientHistory.push(newNutrientEntry);
    }

    // Save the updated profile
    const updatedProfile = await profile.save();
    response.status(200).json(updatedProfile);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Get Calorie Consumed of Today
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getDailyCalorieConsumedService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.params.userId;

    // Find the user's nutritional profile based on userId
    const profile = await NutritionalProfileModel.findOne({ userId });

    if (!profile) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProfileResponseMessage.PROFILE_NOT_FOUND,
      });
    }

    // Get today's date
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // Find today's calorie entry
    const todayCalorieEntry = profile.calorieHistory.find(
      (entry) => entry.date.getTime() === todayDate.getTime()
    );

    if (!todayCalorieEntry) {
      return response.status(ResponseCode.SUCCESS).json({
        message: ProfileResponseMessage.NO_DATA,
        data: { caloriesConsumed: 0 },
      });
    }

    return response.status(ResponseCode.SUCCESS).json({
      message: ProfileResponseMessage.DATA_FOUND,
      data: { caloriesConsumed: todayCalorieEntry.caloriesConsumed },
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Get Calorie Consumed of Last Week (Last 7 Days)
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getWeeklyCalorieConsumedService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.params.userId;

    // Find the user's nutritional profile based on userId
    const profile = await NutritionalProfileModel.findOne({ userId });

    if (!profile) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProfileResponseMessage.PROFILE_NOT_FOUND,
      });
    }

    // Get today's date and the date 7 days ago
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    // Filter the calorie history for the last 7 days
    const lastWeekCalorieEntries = profile.calorieHistory.filter(
      (entry) => entry.date >= lastWeek && entry.date <= today
    );

    const totalCaloriesConsumed = lastWeekCalorieEntries.reduce(
      (total, entry) => total + entry.caloriesConsumed,
      0
    );

    return response.status(ResponseCode.SUCCESS).json({
      message: ProfileResponseMessage.DATA_FOUND,
      data: { totalCaloriesConsumed },
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Get Water Intake of Last Week (Last 7 Days)
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getWeeklyWaterIntakeService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.params.userId;

    // Find the user's nutritional profile based on userId
    const profile = await NutritionalProfileModel.findOne({ userId });

    if (!profile) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProfileResponseMessage.PROFILE_NOT_FOUND,
      });
    }

    // Get today's date and the date 7 days ago
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    // Filter the water intake history for the last 7 days
    const lastWeekWaterIntake = profile.waterIntakeHistory.filter(
      (entry) => entry.date >= lastWeek && entry.date <= today
    );

    const totalWaterIntake = lastWeekWaterIntake.reduce(
      (total, entry) => total + entry.waterIntake,
      0
    );

    return response.status(ResponseCode.SUCCESS).json({
      message: ProfileResponseMessage.DATA_FOUND,
      data: { totalWaterIntake },
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};

/**
 * Get Water Intake of Today
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const getDailyWaterIntakeService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.params.userId;

    // Find the user's nutritional profile based on userId
    const profile = await NutritionalProfileModel.findOne({ userId });

    if (!profile) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProfileResponseMessage.PROFILE_NOT_FOUND,
      });
    }

    // Get today's date
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // Find today's calorie entry
    const todayWaterIntake = profile.waterIntakeHistory.find(
      (entry) => entry.date.getTime() === todayDate.getTime()
    );

    if (!todayWaterIntake) {
      return response.status(ResponseCode.SUCCESS).json({
        message: ProfileResponseMessage.NO_DATA,
        data: { waterIntake: 0 },
      });
    }

    return response.status(ResponseCode.SUCCESS).json({
      message: ProfileResponseMessage.DATA_FOUND,
      data: { waterIntake: todayWaterIntake.waterIntake },
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProfileResponseMessage.ERROR,
    });
  }
};
