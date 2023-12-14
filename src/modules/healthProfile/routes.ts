// Express Imports
import express from "express";

// Controller Imports
import {
  createHealthProfile,
  getHealthProfile,
  updateHeight,
  updateTargetWeight,
  updateWeight,
} from "./controller";

// eslint-disable-next-line new-cap
const healthProfileRoutes = express.Router();

// Health Profile Routes
healthProfileRoutes.get("/get-profile/:userId", getHealthProfile);
healthProfileRoutes.post("/create-profile", createHealthProfile);
healthProfileRoutes.put("/update-weight", updateWeight);
healthProfileRoutes.put("/update-height", updateHeight);
healthProfileRoutes.put("/update-target-weight", updateTargetWeight);

export default healthProfileRoutes;

// END OF FILE
