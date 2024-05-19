// Express Imports
import express from "express";

// Controller Imports
import {
  createNutritionalProfile,
  getDailyCalorieConsumed,
  getDailyNutrientHistory,
  getDailyWaterIntake,
  getNutritionalProfile,
  getNutritionalProfilesForDates,
  getWeeklyCalorieConsumed,
  getWeeklyWaterIntake,
  updateBloodProfile,
  updateCalorieHistory,
  updateNutrientHistory,
  updateWaterIntakeHistory,
} from "./controller";

// eslint-disable-next-line new-cap
const nutritionalProfileRoutes = express.Router();

// Nutritional Profile Routes
nutritionalProfileRoutes.get("/get-profile/:userId", getNutritionalProfile);

nutritionalProfileRoutes.post("/create-profile", createNutritionalProfile);

nutritionalProfileRoutes.put("/update-calorie-history", updateCalorieHistory);

nutritionalProfileRoutes.put(
  "/update-water-intake-history",
  updateWaterIntakeHistory
);
nutritionalProfileRoutes.put("/update-blood-profile", updateBloodProfile);
nutritionalProfileRoutes.put("/update-nutrient-history", updateNutrientHistory);
nutritionalProfileRoutes.get(
  "/get-weekly-calories-consumed/:userId",
  getWeeklyCalorieConsumed
);
nutritionalProfileRoutes.get(
  "/get-daily-calories-consumed/:userId",
  getDailyCalorieConsumed
);
nutritionalProfileRoutes.get(
  "/get-weekly-water-intake/:userId",
  getWeeklyWaterIntake
);
nutritionalProfileRoutes.get(
  "/get-daily-water-intake/:userId",
  getDailyWaterIntake
);

nutritionalProfileRoutes.get(
  "/get-daily-nutrient-history/:userId",
  getDailyNutrientHistory
);

nutritionalProfileRoutes.get(
  "/get-day-history/:userId/:startDate/:endDate",
  getNutritionalProfilesForDates
);

export default nutritionalProfileRoutes;

// END OF FILE
