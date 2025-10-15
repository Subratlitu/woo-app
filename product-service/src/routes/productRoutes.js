import express from "express";
import { testFetchProducts, ingestProductsHandler, getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// Test fetch route (from Step 3)
router.get("/test-fetch", testFetchProducts);

// Manual ingestion route
router.post("/ingest", ingestProductsHandler);

router.get("/", getAllProducts);

export default router;
