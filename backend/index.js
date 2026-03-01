import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ quiet: true });
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

import authRoutes from "./routes/auth.route.js";
import capsuleRoutes from "./routes/capsule.route.js";
import cronJob from "./utils/cron.js";

// API's
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/capsule", capsuleRoutes);

// It tells your Express backend to serve your frontend build files
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    cronJob.start();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

startServer();
