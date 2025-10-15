import express from "express";
import { evaluateSegmentHandler } from "../controllers/segmentController.js";

const router = express.Router();

// POST /api/segments/evaluate
router.post("/evaluate", evaluateSegmentHandler);

export default router;
