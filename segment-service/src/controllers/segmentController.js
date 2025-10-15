import { evaluateSegment } from "../utils/evaluateSegment.js";

// Segment API handler
export const evaluateSegmentHandler = async (req, res) => {
  try {
    const { rules, page = 1, limit = 10 } = req.body;

    if (!rules || !rules.trim()) {
      return res.status(400).json({ message: "Rules are required" });
    }

    const ruleLines = rules.split("\n").map(r => r.trim()).filter(Boolean);

    const { filtered, totalPages } = await evaluateSegment(ruleLines, parseInt(page), parseInt(limit));

    const plainResults = filtered.map(r => r.toObject ? r.toObject() : r);

    res.status(200).json({
      page: parseInt(page),
      totalPages,
      products: plainResults
    });

  } catch (error) {
    console.error("Segment evaluation error:", error);
    res.status(500).json({ message: error.message });
  }
};

