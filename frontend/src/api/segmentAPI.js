import axios from "axios";

const SEGMENT_SERVICE_URL = import.meta.env.VITE_SEGMENT_SERVICE_URL;

export const evaluateSegment = async (rulesText, page = 1, limit = 10) => {
  try {
    const res = await axios.post(SEGMENT_SERVICE_URL, { rules: rulesText, page, limit });

    if (!res.data || !res.data.products) {
      return { products: [], page: 1, totalPages: 1 };
    }

    return res.data;

  } catch (error) {
    console.error("Segment API error:", error.response?.data || error.message);
    return { products: [], page: 1, totalPages: 1 };
  }
};
