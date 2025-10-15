import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import segmentRoutes from "./src/routes/segmentRoutes.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/segments", segmentRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" Segment Service: MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.listen(PORT, () => console.log(`🚀 Segment service running on port ${PORT}`));
