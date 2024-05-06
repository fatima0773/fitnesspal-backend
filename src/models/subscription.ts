// Mongoose Imports
import mongoose, { Document, Model, Schema } from "mongoose";

// Create interfact for user checkout information
export interface ISubscriptionDetails extends Document {
  userId: string;
  card: [ICardDetails];
  status: boolean;
}

// Create interfact for user credit card
export interface ICardDetails extends Document {
  cardNumber: string;
  cvv: string;
  expirationDate: Date;
  isActive: boolean;
}

// Create schema for user checkout information
const cardDetailSchema: Schema<ICardDetails> = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

// Create schema for user checkout information
const SubscriptionDetailSchema: Schema<ISubscriptionDetails> =
  new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    card: [cardDetailSchema],
    status: {
      type: Boolean,
      required: true,
    },
  });

const subscriptionDetails: Model<ISubscriptionDetails> =
  mongoose.model<ISubscriptionDetails>(
    "subscriptionDetails",
    SubscriptionDetailSchema
  );

export default subscriptionDetails;

// END OF FILE
