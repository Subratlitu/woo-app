import axios from "axios";

const PRODUCT_SERVICE_URL = import.meta.env.VITE_PRODUCT_SERVICE_URL;

export const fetchProducts = async (page = 1, limit = 10) => {
  const res = await axios.get(PRODUCT_SERVICE_URL, { params: { page, limit } });
  return res.data;
};
