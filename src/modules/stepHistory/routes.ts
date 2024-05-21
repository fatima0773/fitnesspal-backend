// Express Imports
import express from "express";

// Controller Imports
import {
  createStepHistory,
  getAllStepHistories,
  getStepHistoryForDate,
  getStepHistoryForDates,
  getStepHistoryForToday,
  updateStepGoal,
  updateSteps,
} from "./controller";

// eslint-disable-next-line new-cap
const stepHistoryRoutes = express.Router();

// Health Profile Routes
stepHistoryRoutes.get("/get-steps/:userId", getAllStepHistories);
stepHistoryRoutes.get("/get-steps/:userId/:date", getStepHistoryForDate);
stepHistoryRoutes.get("get-today-steps/:userId", getStepHistoryForToday);
stepHistoryRoutes.get("/get-steps/:userId/:startdate/:enddate", getStepHistoryForDates);
stepHistoryRoutes.post("/create-step-history", createStepHistory);
stepHistoryRoutes.put("/update-steps", updateSteps);
stepHistoryRoutes.put("/update-step-goal", updateStepGoal);

export default stepHistoryRoutes;

// END OF FILE
