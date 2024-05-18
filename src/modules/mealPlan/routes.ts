// Express Imports
import express from "express";

// Controller Imports
import { completeMeal, generateMealPlan, getMealPlan } from "./controller";

// eslint-disable-next-line new-cap
const mealPlanRoutes = express.Router();

// Nutritional Profile Routes
mealPlanRoutes.post("/generate", generateMealPlan);
mealPlanRoutes.put("/complete-meal", completeMeal);
mealPlanRoutes.get("/:userId", getMealPlan);

export default mealPlanRoutes;

// END OF FILE
