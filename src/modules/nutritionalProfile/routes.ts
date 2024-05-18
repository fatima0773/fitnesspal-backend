// Express Imports
import express from "express";

// Controller Imports
import {
  createNutritionalProfile,
  getNutritionalProfile,
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

export default nutritionalProfileRoutes;

// END OF FILE
