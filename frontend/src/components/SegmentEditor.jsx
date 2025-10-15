
import React, { useState } from "react";
import { evaluateSegment } from "../api/segmentAPI";
import "./SegmentEditor.css";

const SegmentEditor = ({
  setSegmentResult,
  setPage,
  setTotalPages,
  setIsSegment,
  setSegmentRules,
  limit,
}) => {
  const [rulesText, setRulesText] = useState("");

  const handleSubmit = async () => {
    try {
      const result = await evaluateSegment(rulesText, 1, limit);
      console.log("Segment API result:", result);

      setSegmentResult(result);
      setPage(result.page || 1);
      setTotalPages(result.totalPages || 1);
      setIsSegment(true);
      setSegmentRules(rulesText); // save rules for pagination
    } catch (error) {
      console.error(error);
      setSegmentResult({ products: [] });
      setPage(1);
      setTotalPages(1);
      setIsSegment(false);
      setSegmentRules("");
    }
  };

  return (
  <div className="segment-card" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
    <h2 style={{ marginBottom: "10px" }}>📝 Evaluate Segment Rules</h2>
    <p style={{ color: "#555", marginBottom: "8px", fontSize: "14px" }}>
      Enter one rule per line using the following allowed fields:
      <br />
      <b>on_sale, price, stock_quantity, stock_status, title</b>
    </p>

    <textarea
      value={rulesText}
      onChange={(e) => setRulesText(e.target.value)}
      placeholder={`Example rules:
        on_sale = true
        price > 30
        price <= 100
        stock_status = instock
        title = Molestiae.`}
      style={{
        width: "100%",
        height: "180px",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontFamily: "monospace",
        fontSize: "14px",
        backgroundColor: "#f9f9f9",
        resize: "vertical"
      }}
    />

    <button
      onClick={handleSubmit}
      style={{
        marginTop: "15px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px"
      }}
    >
      Evaluate Segment
    </button>
  </div>
);

};

export default SegmentEditor;

