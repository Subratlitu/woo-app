// src/controllers/productController.js
import { fetchWooProducts } from "../utils/wooClient.js";
import { ingestProducts } from "../utils/ingestProducts.js";
import { Product } from "../models/Product.js";


export const testFetchProducts = async (req, res) => {
  try {
    const products = await fetchWooProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

 
export const ingestProductsHandler = async (req, res) => {
  try {
    const result = await ingestProducts();
    res.status(200).json({ message: "Products ingested successfully", ...result });
  } catch (error) {
    res.status(500).json({ message: "Failed to ingest products", error: error.message });
  }
};

 
/**
 * Get all products from MongoDB
 */
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // default page 1
    const limit = parseInt(req.query.limit) || 10; // default 10 products per page
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find().sort({ created_at: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    console.error(" Error fetching products from DB:", error.message);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};



