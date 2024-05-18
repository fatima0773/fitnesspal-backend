// Express Imports
import express, { Express } from "express";

// Dotenv Imports
import dotenv from "dotenv";

// Routes Imports
import userRoutes from "./modules/auth/routes";

// DB Import
import connectDB from "./config/db";

// Cors Import
import cors from "cors";

// Redis Imports
import connectRedis from "./config/redis";

// Winston Logger Imports
import { logger } from "./config/winstonLog";
import paymentRoutes from "./modules/payment/routes";
import nutritionalProfileRoutes from "./modules/nutritionalProfile/routes";
import subscriptionRoutes from "./modules/subscription/routes";
import healthProfileRoutes from "./modules/healthProfile/routes";
import stepHistoryRoutes from "./modules/stepHistory/routes";
import mealPlanRoutes from "./modules/mealPlan/routes";

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT;

// Database Connection
connectDB();

// Redis Connection
connectRedis();

// Create express application instance
const app: Express = express();
const port = PORT || 3000;

const corsOptions = {
  origin: `http://localhost:3000`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the dedicated routes middleware
app.use("/user/", userRoutes);
app.use("/nutritional-profile/", nutritionalProfileRoutes);
app.use("/health-profile/", healthProfileRoutes);
app.use("/subscription/", subscriptionRoutes);
app.use("/checkout/", paymentRoutes);
app.use("/step-tracker/", stepHistoryRoutes);
app.use("/meal-plan/", mealPlanRoutes);
// Start the server and listen on the specified port
app.get("/", (req, res) => {
  res.send(`Server running at http://localhost:${port}`);
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});

// END OF FILE
