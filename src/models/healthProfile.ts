// Mongoose Imports
import mongoose, { Document, Model, Schema } from "mongoose";

// LIST OF INTERFACE

// Create interfact for health profile
export interface IHealthProfile extends Document {
  userId: string;
  weight: number;
  height: number;
  bmi: number;
  diseases: [string];
  disabilities: [string];
  targetWeight: number;
  toningAreas: [string];
}

// Create schema for nutritional profile
const healthProfileSchema: Schema<IHealthProfile> = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
  diseases: {
    type: [String],
    required: true,
  },
  disabilities: {
    type: [String],
    required: true,
  },
  targetWeight: {
    type: Number,
    required: true,
  },
  toningAreas: {
    type: [String],
    required: true,
  },
});

const healthProfile: Model<IHealthProfile> = mongoose.model<IHealthProfile>(
  "healthProfile",
  healthProfileSchema
);

export default healthProfile;

// END OF FILE
