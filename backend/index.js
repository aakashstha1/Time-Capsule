import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

import authRoutes from "./routes/auth.route.js";
import capsuleRoutes from "./routes/capsule.route.js";

// API's
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/capsule", capsuleRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

startServer();
