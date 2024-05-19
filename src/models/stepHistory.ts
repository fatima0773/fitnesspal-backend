// Mongoose Imports
import mongoose, { Document, Model, Schema } from "mongoose";

// LIST OF INTERFACE

// Create interface for step tracker
export interface IStepHistory extends Document {
  userId: string;
  stepHistory: [IUserStepHistory];
}

export interface IUserStepHistory extends Document {
  stepGoal: number;
  currentSteps: number;
  date: Date;
}

const userHistorySchema: Schema<IUserStepHistory> = new mongoose.Schema({
  stepGoal: {
    type: Number,
    required: true,
  },
  currentSteps: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Create schema for step tracker
const stepHistorySchema: Schema<IStepHistory> = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  stepHistory: [userHistorySchema],
});

const stepHistory: Model<IStepHistory> = mongoose.model<IStepHistory>(
  "stepHistory",
  stepHistorySchema
);

export default stepHistory;

// END OF FILE
