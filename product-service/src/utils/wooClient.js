// src/utils/wooClient.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseURL = process.env.WC_BASE_URL;
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

/**
 * Fetch products from WooCommerce API
 * @returns {Promise<Array>} Array of WooCommerce products
 */
export const fetchWooProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/wp-json/wc/v3/products`, {
      params: {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        per_page: 10, // limit (adjust as needed)
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching products from WooCommerce:", error.message);
    throw error;
  }
};
