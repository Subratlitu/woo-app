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
// import { evaluateSegment } from "../utils/evaluateSegment.js";

// export const evaluateSegmentHandler = async (req, res) => {
//   try {
//     const { rules, page = 1, limit = 10 } = req.body;

//     // Validate rules
//     if (!rules || (typeof rules === "string" && !rules.trim())) {
//       return res.status(400).json({ message: "Rules are required" });
//     }

//     // Support both string and array formats for rules
//     const ruleLines = Array.isArray(rules)
//       ? rules.map(r => r.trim()).filter(Boolean)
//       : rules.split("\n").map(r => r.trim()).filter(Boolean);

//     if (ruleLines.length === 0) {
//       return res.status(400).json({ message: "No valid rules provided" });
//     }

//     // Evaluate segment
//     const { filtered, totalPages } = await evaluateSegment(
//       ruleLines,
//       parseInt(page),
//       parseInt(limit)
//     );

//     // Ensure filtered is an array before mapping
//     const plainResults = Array.isArray(filtered)
//       ? filtered.map(r => (r.toObject ? r.toObject() : r))
//       : [];

//     res.status(200).json({
//       page: parseInt(page),
//       totalPages,
//       totalResults: plainResults.length,
//       products: plainResults,
//     });
//   } catch (error) {
//     console.error("Segment evaluation error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };
