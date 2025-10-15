import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import cron from "node-cron";
import { ingestProducts } from "./utils/ingestProducts.js";
import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "../swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() => {
    console.log(" MongoDB connected");

    // Cron job for periodic ingestion (default every hour)
    cron.schedule(process.env.CRON_SCHEDULE || "0 * * * *", async () => {
      console.log(" Running scheduled ingestion...");
      await ingestProducts();
    });

    app.listen(PORT, () => console.log(` Product service running on port ${PORT}...`));
  })
  .catch((err) => console.error(" MongoDB connection error:", err));
