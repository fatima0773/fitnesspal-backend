// Express Imports
import express from "express";

// Controller Imports
import {
  createStepHistory,
  getAllStepHistories,
  // createStepHistory
  getStepHistory,
  updateSteps,
  // getStepHistoryByDate,
  // getStepHistoryByDateRange,
  // updateSteps,
} from "./controller";

// eslint-disable-next-line new-cap
const stepHistoryRoutes = express.Router();

// Health Profile Routes
stepHistoryRoutes.get("/get-steps/:userId", getAllStepHistories);
stepHistoryRoutes.get("/get-steps/:userId/:date", getStepHistory);
stepHistoryRoutes.get("/get-steps/:userId/:startdate/:enddate", getStepHistory);
stepHistoryRoutes.post("/create-step-history", createStepHistory);
stepHistoryRoutes.put("/update-steps", updateSteps);

export default stepHistoryRoutes;

// END OF FILE
