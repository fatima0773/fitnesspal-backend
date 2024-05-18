import { Request, Response } from "express";
import { ProfileResponseMessage, ResponseCode } from "../../common/apiResponse";
import getPlan from "../../utils/mealPlan";
import mongoose from "mongoose";

export const generateMealPlanService = async (
  request: Request,
  response: Response
) => {
  try {
    const requestBody = request.body;
    const mealPlanData = await getPlan(requestBody);
    const db = mongoose.connection.db;
    const collection = db.collection("mealPlans");
    const userId = requestBody.userId;

    // Check if a meal plan exists for the userId
    const existingMealPlan = await collection.findOne({ userId });
    const mealPlanTracker = {
      Breakfast: [0, 0, 0, 0, 0, 0, 0],
      Lunch: [0, 0, 0, 0, 0, 0, 0],
      Dinner: [0, 0, 0, 0, 0, 0, 0],
    };
    if (existingMealPlan) {
      // Update the mealPlanData if the meal plan exists
      await collection.findOneAndUpdate(
        { userId },
        { $set: { mealPlanData, mealPlanTracker } }
      );
      response.status(200).json({
        message: "Meal plan updated successfully",
        mealPlan: mealPlanData,
      });
    } else {
      // Create a new meal plan if it doesn't exist
      const newMealPlan = {
        userId,
        planType: requestBody.plan,
        health: requestBody.health,
        calories: requestBody.calories,
        diet: requestBody.diet,
        meals: requestBody.meals,
        mealPlanData: mealPlanData,
        mealPlanTracker: mealPlanTracker,
      };
      await collection.insertOne(newMealPlan);
      response.status(200).json({
        message: "Meal plan generated and saved successfully",
        mealPlan: mealPlanData,
      });
    }
  } catch (error) {
    console.error("Error generating meal plan:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMealPlanService = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.params.userId;
    const db = mongoose.connection.db;
    const collection = db.collection("mealPlans");

    // Find the meal plan document by userID
    const mealPlan = await collection.findOne({ userId });

    if (mealPlan) {
      // If a meal plan is found, send it in the response
      response.status(200).json({
        message: "Meal plan found",
        mealPlan: mealPlan.mealPlanData,
        status_code: ResponseCode.SUCCESS,
        mealPlanTracker: mealPlan.mealPlanTracker,
      });
    } else {
      // If no meal plan is found for the userID, send an appropriate message
      response.status(404).json({
        message: "Meal plan not found for the userID",
        status_code: ResponseCode.NOT_FOUND,
      });
    }
  } catch (error) {
    console.error("Error retrieving meal plan:", error);
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const completeMealService = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId, mealType, dayIndex } = request.body;
    const db = mongoose.connection.db;
    const collection = db.collection("mealPlans");

    // Find the meal plan document by userID
    const mealPlan = await collection.findOne({ userId });

    if (mealPlan) {
      // If a meal plan is found, update the mealPlanTracker based on the selected meal and day
      mealPlan.mealPlanTracker[mealType][dayIndex] = 1;

      // Update the document in the database with the modified mealPlanTracker
      await collection.findOneAndUpdate(
        { userId },
        { $set: { mealPlanTracker: mealPlan.mealPlanTracker } }
      );

      response.status(200).json({
        message: `Meal plan tracker updated for ${mealType} on day ${dayIndex}`,
        mealPlanTracker: mealPlan.mealPlanTracker,
      });
    } else {
      // If no meal plan is found for the userID, send an appropriate message
      response.status(404).json({
        message: "Meal plan not found for the userID",
      });
    }
  } catch (error) {
    console.error("Error updating meal plan tracker:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};
