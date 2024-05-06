// Mongoose Imports
import mongoose, { Document, Model, Schema } from "mongoose";

// LIST OF INTERFACE

// Create interface for nutritional profile
export interface INutritionalProfile extends Document {
  userId: string;
  calorieHistory: [ICalorieHistory];
  waterIntakeHistory: [IWaterIntakeHistory];
  bloodProfile: IBloodProfile;
  nutrientHistory: [INutrientHistory];
}

// Create interface for calorie history
export interface ICalorieHistory extends Document {
  date: Date;
  caloriesConsumed: number;
  caloriesBurned: number;
}

// Create interface for nutrient history
export interface INutrientHistory extends Document {
  date: Date;
  cholesterol: number;
  protein: number;
  carbs: number;
  sodium: number;
  fats: number;
}

// Create interface for water intake history
export interface IWaterIntakeHistory extends Document {
  date: Date;
  waterIntake: number;
}

// Create interface for blood profile
export interface IBloodProfile extends Document {
  sodium: number;
  calcium: number;
  iron: number;
  cholesterol: number;
  uricAcid: number;
  vitaminD: number;
  vitaminC: number;
  vitaminB12: number;
  hemoglobin: number;
}

// Create schema for water intake history
const waterIntakeHistorySchema: Schema<IWaterIntakeHistory> =
  new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    waterIntake: {
      type: Number,
      required: true,
    },
  });

// Create schema for water intake history
const calorieHistorySchema: Schema<ICalorieHistory> = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  caloriesConsumed: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
});

// Create schema for water intake history
const bloodProfileSchema: Schema<IBloodProfile> = new mongoose.Schema({
  sodium: {
    type: Number,
    required: true,
  },
  calcium: {
    type: Number,
    required: true,
  },
  iron: {
    type: Number,
    required: true,
  },
  cholesterol: {
    type: Number,
    required: true,
  },
  uricAcid: {
    type: Number,
    required: true,
  },
  vitaminD: {
    type: Number,
    required: true,
  },
  vitaminC: {
    type: Number,
    required: true,
  },
  vitaminB12: {
    type: Number,
    required: true,
  },
  hemoglobin: {
    type: Number,
    required: true,
  },
});

// Create schema for nutrient history
const nutrientHistorySchema: Schema<INutrientHistory> = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  cholesterol: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  sodium: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
});

// Create schema for nutritional profile
const nutritionalProfileSchema: Schema<INutritionalProfile> =
  new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    calorieHistory: [calorieHistorySchema],
    waterIntakeHistory: [waterIntakeHistorySchema],
    bloodProfile: bloodProfileSchema,
    nutrientHistory: [nutrientHistorySchema],
  });

const nutritionalProfile: Model<INutritionalProfile> =
  mongoose.model<INutritionalProfile>(
    "nutritionalProfile",
    nutritionalProfileSchema
  );

export default nutritionalProfile;

// END OF FILE
