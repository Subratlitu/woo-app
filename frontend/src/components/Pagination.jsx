
import React from "react";

const Pagination = ({ page, totalPages, setPage }) => {
  const handlePrev = () => setPage(Math.max(page - 1, 1));
  const handleNext = () => setPage(Math.min(page + 1, totalPages));

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <button onClick={handlePrev} disabled={page === 1}>
        ⬅ Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={page === totalPages}>
        Next ➡
      </button>
    </div>
  );
};

export default Pagination;
