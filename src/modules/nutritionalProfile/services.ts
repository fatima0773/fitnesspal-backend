// Express Imports
import { Request, Response } from "express";

// Model Imports
import NutritionalProfileModel, {
  ICalorieHistory,
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

/**
 * Update User Calorie History
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const updateCalorieHistoryService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId: string = request.body.userId; // Assuming userId is sent in the request body
    const { consumedCalories, burnedCalories } = request.body;

    // Find the user's nutritional profile
    const profile = await NutritionalProfileModel.findOne({ userId: userId });

    if (!profile) {
      return response
        .status(404)
        .json({ message: "Nutritional profile not found for this user." });
    }

    // Get today's date in the format 'YYYY-MM-DD'
    const todayDate = new Date().toISOString().split("T")[0];

    // Check if a calorie history entry already exists for today
    const todayCalorieEntry = profile.calorieHistory.find(
      (entry) => entry.date === todayDate
    );

    if (todayCalorieEntry) {
      // If entry exists, update consumed and burned calories
      todayCalorieEntry.caloriesConsumed += consumedCalories || 0;
      todayCalorieEntry.caloriesBurned += burnedCalories || 0;
    } else {
      // If entry doesn't exist, create a new entry
      const newCalorieEntry: ICalorieHistory = {
        date: todayDate,
        caloriesConsumed: consumedCalories || 0,
        caloriesBurned: burnedCalories || 0,
      } as ICalorieHistory;

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
    const userId: string = request.body.userId; // Assuming userId is sent in the request body
    const { waterIntake } = request.body;

    // Find the user's nutritional profile
    const profile = await NutritionalProfileModel.findOne({ userId: userId });

    if (!profile) {
      return response
        .status(404)
        .json({ message: "Nutritional profile not found for this user." });
    }

    // Get today's date in the format 'YYYY-MM-DD'
    const todayDate = new Date().toISOString().split("T")[0];

    // Check if a water intake history entry already exists for today
    const todayWaterIntakeEntry = profile.waterIntakeHistory.find(
      (entry) => entry.date === todayDate
    );

    if (todayWaterIntakeEntry) {
      // If entry exists, update water intake
      todayWaterIntakeEntry.waterIntake += waterIntake || 0;
    } else {
      // If entry doesn't exist, create a new entry
      const newWaterIntakeEntry: IWaterIntakeHistory = {
        date: todayDate,
        waterIntake: waterIntake || 0,
      } as IWaterIntakeHistory;

      profile.waterIntakeHistory.push(newWaterIntakeEntry);
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
