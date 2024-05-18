// mealPlan.ts
import mongoose, { Schema, Document } from "mongoose";

interface Recipe {
  recipe: {
    uri: string;
    label: string;
    image: string;
    // Add more properties as needed
  };
}

interface MealType {
  q: string;
  from: number;
  to: number;
  more: boolean;
  count: number;
  hits: Recipe[];
}

export interface IMealPlan extends Document {
  userId: string;
  planType: number;
  health: { [key: string]: boolean };
  calories: { min: number; max: number };
  diet: string;
  meals: string[];
  mealTypes: MealType[];
}

const mealPlanSchema: Schema = new Schema({
  userId: String,
  planType: Number,
  health: Object,
  calories: { min: Number, max: Number },
  diet: String,
  meals: [String],
  mealTypes: [{ type: Object, required: true }],
});

export default mongoose.model<IMealPlan>("MealPlan", mealPlanSchema);
