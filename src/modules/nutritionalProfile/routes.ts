// Express Imports
import express from "express";

// Controller Imports
import {
  createNutritionalProfile,
  getDailyCalorieConsumed,
  getNutritionalProfile,
  getWeeklyCalorieConsumed,
  updateBloodProfile,
  updateCalorieHistory,
  updateNutrientHistory,
} from "./controller";

// eslint-disable-next-line new-cap
const nutritionalProfileRoutes = express.Router();

// Nutritional Profile Routes
nutritionalProfileRoutes.get("/get-profile/:userId", getNutritionalProfile);

nutritionalProfileRoutes.post("/create-profile", createNutritionalProfile);

nutritionalProfileRoutes.put("/update-calorie-history", updateCalorieHistory);

nutritionalProfileRoutes.put(
  "/update-water-intake-history",
  updateCalorieHistory
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

export default nutritionalProfileRoutes;

// END OF FILE
